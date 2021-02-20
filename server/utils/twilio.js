require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_SECRET_KEY;

const twilio = require("twilio")(accountSid, authToken);

module.exports = {
  //this send otp message to the user
  twilioVerify: function (phone) {
    twilio.verify
      .services(process.env.TWILIO_VERIFICATION_SID)
      .verifications.create({ to: phone, channel: "sms" });
  },

  //this receives the otp
  twilioChecks: function (code, phone) {
    return twilio.verify
      .services(process.env.TWILIO_VERIFICATION_SID)
      .verificationChecks.create({
        code: code,
        to: phone,
      });
  },
};
