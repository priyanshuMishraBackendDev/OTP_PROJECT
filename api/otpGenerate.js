const express = require('express');
const OtpController = express.Router();
const optGenerator = require('./../Utils/otpUtils').generateOTP
const Token = require('./../models/Token')

OtpController.route('/')
    .post(async (req, res, next) => {
      const otp = optGenerator(6)
      console.log(otp)
      Token.create({
        token:otp
      })
      res.send(otp)
    });

module.exports = OtpController;
