var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const joi = require('joi');
var express = require("express");
const User = require('../models/usersmodel');
const JWT = require("jsonwebtoken");


const loginSchema = joi.object({
    first_name: joi.string().required().min(2),
    last_name: joi.string().required().min(2),
    email: joi.string().required().min(5).email(),
    password: joi.string().required().min(8),
});
router.post('/', async function (req, res, next) {
    console.log("555555555555555555555555");
    console.log(req.body);
    const { first_name, last_name, email } = req.body
    let { password } = req.body
    // joi validation
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send("Wrong body");


    const userExists = await User.findOne({ email });

    // console.log(first_name + " " + last_name);
    if (!userExists) {
        password = await bcrypt.hash(password, 10)
        const user = {
            first_name,
            last_name,
            email,
            password
        }
        // console.log(email + " nbc" + password);
        User.create(user).then(() => {
            return res.status(200).send("user registered successfully")
        }).catch(err => {
            return res.status(400).send("couldn't register user")
        })

    } else {
        return res.status(400).send("user already registered")
    }


});
module.exports = router;
