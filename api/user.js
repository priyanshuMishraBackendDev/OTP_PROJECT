const express = require('express');
const UserController = express.Router();
const User = require('./../models/User')
const UserToken = require('./../models/UserToken')
const { generateAuthToken, requireLogin } = require('./../Utils/user')

UserController.route('/login')
    .post(async (req, res, next) => {
        res.send()
    });

UserController.route('/signUp')
    .post(async (req, res, next) => {
        const { email, phone, name, gender, age, password } = req.body // extracting all the details from request body
        const ageVerify = req.query.ageVerify // extracting ageVerify query from request
        if (ageVerify == true) {
            let ageLimit = req.query.age ? req.query.age : 18  // here we are checking if we have any age limit set by query or not if not we are using standard 18 years as age limit
            if (ageLimit > age) {
                return res.status(400).send("Hey aren't you too small to use this site ? \n Better luck next time kiddo :)")
            }
        }
        if (!name || !email || !phone || !age || !password) {
         //   return res.status(400).send()
        }

        const userObj = {
            name,
            email,
            phone,
            age,
            password
        }
        const holder = gender ? userObj.gender = gender : ""
        const userData = await User.create(userObj)
        const userId = userData._id
        const token = generateAuthToken(userId)
        const tokenData = await UserToken.create({
            userId,
            token
        })
        req.session.authToken = token;
        res.send()
    });

UserController.route('/logOut')
    .post(async (req, res, next) => {
        res.send()
    });

UserController.route('/delete')
    .delete(requireLogin , async (req, res, next) => {
        res.send()
    });

module.exports = UserController;
