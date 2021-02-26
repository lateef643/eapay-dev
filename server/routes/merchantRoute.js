const mongoose = require("mongoose");
const request = require("request");
const userAgent = require("useragent");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const formidable = require("express-formidable");
const QRCode = require("qrcode");

userAgent(true);

const Merchant = mongoose.model("merchants");

const emailCheck = require("../utils/checkEmail");
const twilio = require("../utils/twilio");

const merchantVerify = require("../middleware/merchantVerify");
const updateMerchant = require("../middleware/updateMerchant");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = (api) => {
  //the merchant register route accept email and password
  //the route will  process if user phone number is entered
  //it returns the error with the error msg as json and success with the merchant data
  api.post("/api/merchant/register", (req, res) => {
    const { email, password } = req.body;
    let agent = userAgent.parse(req.headers["user-agent"]);
    let device = [];
    device.push(agent.toString());
    const isEmail = emailCheck(email);
    let obj = {};
    if (isEmail) {
      obj = { email, password, device };
    } else {
      const phone = email.length === 11 ? email.replace("0", "+234") : email;
      twilio.twilioVerify(phone);
      obj = { phone, password, device };
    }
    const merchant = new Merchant(obj);
    merchant.save((err, doc) => {
      if (err) return res.status(401).send(err);
      res.status(200).json({ success: true, doc });
    });
  });

  //accept merchant id as url  query params
  //this is the route that receive the otp verificationn from phone
  ///api/merchant/verify?id=${id} url format
  //it returns the updated verification, logn date and new device state of the user
  api.post("/api/merchant/verify", async (req, res) => {
    let agent = userAgent.parse(req.headers["user-agent"]);
    let device = agent.toString();
    const code = req.body.code;
    const phone =
      req.body.phone.length === 11
        ? req.body.phone.replace("0", "+234")
        : req.body.phone;
    const id = req.query.id;
    let verificationResult;
    try {
      verificationResult = await twilio.twilioChecks(code, phone);
    } catch (e) {
      return res.status(500).send(e);
    }
    if (verificationResult.status === "approved") {
      Merchant.findByIdAndUpdate(
        { _id: id },
        {
          $set: { verified: 1, lastLogin: Date.now() },
          $push: { device: device },
        },
        { new: true },
        (err, merchant) => {
          if (err) return res.status(401).send(err);
          return res.status(200).json({ success: true, merchant });
        }
      );
    }
  });

  //accept same parameter as the register route
  //returns error with error msg and lock the acct after five succesive wrong password for 30 mins
  //on sucess returns the merchants data
  api.post("/api/merchant/login", (req, res) => {
    const { email, password } = req.body;
    const isEmail = emailCheck(email);
    let obj = {};
    if (isEmail) {
      obj = { email };
    } else {
      const phone = email.length === 11 ? email.replace("0", "+234") : email;
      obj = { phone };
    }
    let agent = userAgent.parse(req.headers["user-agent"]);
    let device = agent.toString();
    Merchant.loginMerchant(obj, password, device, (err, merchants, type) => {
      if (err) return res.status(401).send(err);
      if (merchants) {
        merchants.getToken((err, merchants) => {
          if (err) return res.status(401).send(err);
          return res
            .cookie("eapay", merchants.token)
            .status(200)
            .json({ success: true, merchants });
        });
      }
      let reason = Merchant.failedLogin;
      switch (type) {
        case reason.NOT_FOUND:
        case reason.PASSWORD_INCORRECT:
          return res.status(401).send("Email or Password incorrect");
        case reason.MAX_ATTEMPTS:
          //Email notification on account
          return res.status(401).send("Check Email  for account notification");
        /* case reason.VERIFY_OTP:
          return res.send("Please Verify your account");*/
      }
    });
  });

  //this check the authentication and verification state of the merchant
  api.get("/api/merchant/auth", merchantVerify, updateMerchant, (req, res) => {
    res.status(200).json({ success: true, isMerchant: true });
  });

  //route to upload the doc using cloudinary
  //the upload image must be named FILE
  //the url gotten from cloudinary is updated in the db
  api.post(
    "/api/merchant/doc_upload",
    merchantVerify,
    updateMerchant,
    formidable(),
    (req, res) => {
      cloudinary.uploader.upload(req.files.file.path, (err, result) => {
        if (err) return res.status(500).send(err);
        Merchant.findByIdAndUpdate(
          { _id: req.user._id },
          { docUpload: result.url },
          { new: true },
          (err, doc) => {
            if (err) return res.status(500).send(err);
            res
              .status(200)
              .json({ success: true, msg: "File uploaded successfully" });
          }
        );
      });
    }
  );

  //this upsate the profile of the merchant,
  //it checks the account number befire perfoming the update
  api.post(
    "/api/merchant/profile",
    merchantVerify,
    updateMerchant,
    (req, res) => {
      const { accNumber, bank } = req.body;
      const body = req.body;
      let options = {
        method: "GET",
        url: `https://api.paystack.co/bank/resolve?account_number=${accNumber}&bank_code=${bank}`,
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        },
      };
      request(options, (err, response) => {
        const resp = JSON.parse(response.body);
        if (resp.status) {
          const qrImg = [{ body }];
          QRCode.toDataURL(qrImg, function (err, url) {
            //access the qrcode with <img src=qrcodeurl />
            Merchant.findByIdAndUpdate(
              { _id: req.user._id },
              { $set: req.body, qrcodeUrl: url },
              { new: true },
              (err, doc) => {
                if (err) return res.status(401).send(err);
                return res.status(200).json({ success: true, doc });
              }
            );
          });
        } else {
          return res.status(401).send(resp.message);
        }
      });
    }
  );

  //on success log the user outand reset token
  api.get(
    "/api/merchant/logout",
    merchantVerify,
    updateMerchant,
    (req, res) => {
      Merchant.findByIdAndUpdate(
        { _id: req.user._id },
        { token: "" },
        (err, merchant) => {
          if (err) return res.status(401).send(err);
          return res.status(200).json({ success: true });
        }
      );
    }
  );
};
