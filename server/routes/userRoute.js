//user routes comes here
require("dotenv").config();
const request = require("request");
const mongoose = require("mongoose");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_SECRET_KEY;

const twilio = require("twilio")(accountSid, authToken);

const User = mongoose.model("users");

module.exports = (app) => {
  //register route which accept bvn, email,date of birth and password
  app.post("/api/user/register", (req, res) => {
    let { bvn, email, dob, password } = req.body;
    //the formtted date of birth shoulf be in YYYY-MM-DD

    let options = {
      method: "GET",
      url: `https://api.paystack.co/bank/resolve_bvn/${bvn}`,
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      },
    };
    request(options, (error, response) => {
      if (response.body.status) {
        if (response.body.data.formatted_dob === dob) {
          let phone = response.body.data.mobile.replace("0", "+234");
          const data = new User({
            email,
            password,
            firstname: response.body.data.first_name,
            lastname: response.body.data.last_name,
            phone,
            dob: response.body.data.formatted_dob,
          });
          try {
            twilio.verify
              .services(process.env.TWILIO_VERIFICATION_SID)
              .verifications.create({ to: phone, channel: "sms" });
            data.save((err, user) => {
              if (err)
                return res
                  .status(401)
                  .json({ data: "Cant save user", success: false, err });
              //user data has been successfully stored in db, the user should be expecting OTP
              res.status(200).json({ data: user, success: true });
            });
          } catch (error) {
            return res
              .status(401)
              .json({ data: "Error sending sms", success: false, error });
          }
        } else {
          //DOB did not match
          return res.status(401).json({
            data: "Information Miss match",
            success: false,
          });
        }
      } else {
        return res
          .status(401)
          .json({ data: "Invalid BVN", success: false, error });
      }
    });
  });

  //accept user id as url  query params
  //this is the route that receive the otp verificationn from phone
  ///api/verify?id=${id} url format
  app.post("/api/verify", async (req, res) => {
    console.log("verify");
    const code = req.body.code;
    const phone = req.body.phone.replace("0", "+234");
    const id = req.query.id;
    let verificationResult;
    try {
      verificationResult = await twilio.verify
        .services(process.env.TWILIO_VERIFICATION_SID)
        .verificationChecks.create({
          code: code,
          to: phone,
        });
      console.log(verificationResult);
    } catch (e) {
      return res.status(500).send(e);
    }
    if (verificationResult.status === "approved") {
      User.findByIdAndUpdate(
        { _id: id },
        { verified: 1 },
        { new: true },
        (err, user) => {
          if (err) return res.status(401).json({ success: false, err });
          return res.status(200).json({ data: user, success: true });
        }
      );
    }
  });
};
