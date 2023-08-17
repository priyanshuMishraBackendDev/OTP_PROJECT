const express = require('express');
const UserController = express.Router();
const Token = require('./../models/Token')

UserController.route('/login')
    .post(async (req, res, next) => {
        res.send()
    });

UserController.route('/signUp')
    .post(async (req, res, next) => {
        res.send()
    });

UserController.route('/logOut')
    .post(async (req, res, next) => {
        res.send()
    });

UserController.route('/delet')
    .delete(async (req, res, next) => {
        res.send()
    });

module.exports = UserController;
