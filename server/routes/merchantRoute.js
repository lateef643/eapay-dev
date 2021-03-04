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
const utilsFunction = require("../utils/utilsFunction");

const merchantVerify = require("../middleware/merchantVerify");
const updateMerchant = require("../middleware/updateMerchant");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = (app) => {
  //the merchant register route accept email and password
  //the route will  process if user phone number is entered
  //it returns the error with the error msg as json and success with the merchant data
  app.post("/api/merchant/register", (req, res) => {
    const { email, password } = req.body;
    if (utilsFunction.checkBody(email) || utilsFunction.checkBody(password))
      return res.json("Invalid Parameter");
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
    Merchant.find({})
      .limit(1)
      .sort({ accNumber: -1 })
      .select("accNumber")
      .exec((err, data) => {
        if (err) return res.json(err);
        let accNumber = data[0].accNumber + 1;
        const merchant = new Merchant(obj, accNumber);
        merchant.save((err, merchants) => {
          if (err) return res.json(err);
          res.status(200).json({
            success: true,
            merchant: {
              name: merchants.fullname,
              email: merchants.email,
              phone: merchants.phone,
              newDevice: merchants.newDevice,
              token: merchants.token,
              _id: merchants._id,
              verified: merchants.verified,
              lockUntil: merchants.lockUntil,
              loginAttempt: merchants.loginAttempt,
            },
          });
        });
      });
  });

  //accept merchant id as url  query params
  //this is the route that receive the otp verificationn from phone
  ///api/merchant/verify?id=${id} url format
  //it returns the updated verification, logn date and new device state of the user
  app.post("/api/merchant/verify", async (req, res) => {
    let agent = userAgent.parse(req.headers["user-agent"]);
    let device = agent.toString();
    const code = req.body.code;
    if (
      utilsFunction.checkBody(code) ||
      utilsFunction.checkBody(req.body.phone) ||
      utilsFunction.checkBody(req.query.id)
    )
      return res.json("Invalid Parameter");
    const phone =
      req.body.phone.length === 11
        ? req.body.phone.replace("0", "+234")
        : req.body.phone;
    const id = req.query.id;
    let verificationResult;
    try {
      verificationResult = await twilio.twilioChecks(code, phone);
    } catch (e) {
      return res.json(e);
    }
    if (verificationResult.status === "approved") {
      Merchant.findByIdAndUpdate(
        { _id: id },
        {
          $set: { verified: 1, lastLogin: Date.now() },
          $push: { device: device },
        },
        { new: true },
        (err) => {
          if (err) return res.json(err);
          return res.status(200).json({ success: true });
        }
      );
    }
  });

  //accept same parameter as the register route
  //returns error with error msg and lock the acct after five succesive wrong password for 30 mins
  //on sucess returns the merchants data
  app.post("/api/merchant/login", (req, res) => {
    const { email, password } = req.body;
    if (utilsFunction.checkBody(email) || utilsFunction.checkBody(password))
      return res.json("Invalid Parameter");
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
      if (err) return res.json(err);
      if (merchants) {
        merchants.getToken((err, merchants) => {
          if (err) return res.json(err);
          return res
            .cookie("eapay", merchants.token)
            .status(200)
            .json({
              success: true,
              merchant: {
                name: merchants.fullname,
                email: merchants.email,
                phone: merchants.phone,
                newDevice: merchants.newDevice,
                token: merchants.token,
                _id: merchants._id,
                verified: merchants.verified,
                lockUntil: merchants.lockUntil,
                loginAttempt: merchants.loginAttempt,
              },
            });
        });
      }
      let reason = Merchant.failedLogin;
      switch (type) {
        case reason.NOT_FOUND:
        case reason.PASSWORD_INCORRECT:
          return res.json("Email or Password incorrect");
        case reason.MAX_ATTEMPTS:
          //Email notification on account
          return res.json("Check Email  for account notification");
      }
    });
  });

  //this check the authentication and verification state of the merchant
  app.get("/api/merchant/auth", merchantVerify, updateMerchant, (req, res) => {
    res.status(200).json({ success: true, isMerchant: true });
  });

  //route to upload the doc using cloudinary
  //the upload image must be named FILE
  //the url gotten from cloudinary is updated in the db
  app.post(
    "/api/merchant/doc_upload",
    merchantVerify,
    updateMerchant,
    formidable(),
    (req, res) => {
      cloudinary.uploader.upload(req.files.file.path, (err, result) => {
        if (err) return res.json(err);
        Merchant.findByIdAndUpdate(
          { _id: req.user._id },
          { docUpload: result.url },
          { new: true },
          (err, doc) => {
            if (err) return res.json(err);
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
  app.post(
    "/api/merchant/profile",
    merchantVerify,
    updateMerchant,
    (req, res) => {
      const { accNumber, bank } = req.body;
      const body = req.body;
      if (
        utilsFunction.checkBody(body) ||
        utilsFunction.checkBody(accNumber) ||
        utilsFunction.checkBody(bank)
      )
        return res.json("Invalid Parameter");
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
              (err, merchants) => {
                if (err) return res.json(err);
                return res.status(200).json({
                  success: true,
                  merchant: {
                    name: merchants.fullname,
                    email: merchants.email,
                    phone: merchants.phone,
                    newDevice: merchants.newDevice,
                    token: merchants.token,
                    _id: merchants._id,
                    verified: merchants.verified,
                    lockUntil: merchants.lockUntil,
                    loginAttempt: merchants.loginAttempt,
                  },
                });
              }
            );
          });
        } else {
          return res.json(resp.message);
        }
      });
    }
  );

  //on success log the user outand reset token
  app.get(
    "/api/merchant/logout",
    merchantVerify,
    updateMerchant,
    (req, res) => {
      Merchant.findByIdAndUpdate(
        { _id: req.user._id },
        { token: "" },
        (err, merchant) => {
          if (err) return res.json(err);
          return res.status(200).json({ success: true });
        }
      );
    }
  );
};
