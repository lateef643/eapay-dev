//user routes comes here
require("dotenv").config();
const request = require("request");
const mongoose = require("mongoose");

const twilio = require("../utils/twilio");

const User = mongoose.model("users");

module.exports = (api) => {
  //register route which accept bvn, email,date of birth and password
  api.post("/api/user/register", (req, res) => {
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
      const resp = JSON.parse(response.body);
      if (resp.status) {
        if (resp.data.formatted_dob === dob) {
          let phone = resp.data.mobile.replace("0", "+234");
          const data = new User({
            email,
            password,
            firstname: resp.data.first_name,
            lastname: resp.data.last_name,
            phone,
            dob: resp.data.formatted_dob,
          });
          try {
            twilio.twilioVerify(phone);
            data.save((err, user) => {
              if (err) return res.status(401).send("Cant save user");
              //user data has been successfully stored in db, the user should be expecting OTP
              res.status(200).json({
                user: {
                  name: `${user.lastname} ${user.firstname}`,
                  email: user.email,
                  phone: user.phone,
                  _id: user._id,
                  newDevice: user.newDevice,
                  token: user.token,
                  verified: user.verified,
                  lockUntil: user.lockUntil,
                  loginAttempt: user.loginAttempt,
                },
                success: true,
              });
            });
          } catch (error) {
            return res.json("Error sending sms");
          }
        } else {
          //DOB did not match
          return res.json("Information Miss match");
        }
      } else {
        return res.json("Invalid BVN");
      }
    });
  });

  //accept user id as url  query params
  //this is the route that receive the otp verificationn from phone
  ///api/verify?id=${id} url format
  api.post("/api/user/verify", async (req, res) => {
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
      User.findByIdAndUpdate(
        { _id: id },
        { verified: 1 },
        { new: true },
        (err) => {
          if (err) return res.status(401).send(err);
          return res.status(200).json({ success: true });
        }
      );
    }
  });
};
