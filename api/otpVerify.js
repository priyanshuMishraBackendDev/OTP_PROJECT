const express = require('express');
const VerifyController = express.Router();
const optGenerator = require('./../Utils/otpUtils').generateOTP
const Token = require('./../models/Token')

VerifyController.route('/')
    .get(async (req, res, next) => {
      const otp = optGenerator(6)
      console.log(otp)
      Token.create({
        token:otp
      })
      res.send(otp)
    });

module.exports = VerifyController;