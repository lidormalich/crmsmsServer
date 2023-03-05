var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const joi = require('joi');
var express = require("express");
const User = require('../models/usersmodel');
const JWT = require("jsonwebtoken");


const loginSchema = joi.object({
    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(8),
});

router.post('/', async function (req, res, next) {
    // joi validation
    const { email, password } = req.body
    const { error } = loginSchema.validate({ email, password });
    if (error) return res.status(400).send("Wrong body");


    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send("Wrong Email or Password");
    }

    if (user) {
        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.status(400).send("email or password is wrong");
        }

        // Generate Token
        const token = JWT.sign({ _id: user._id, email: user.email, first_name: user.first_name }, process.env.JWT_Key);

        res.status(200).send({ "first_name": user.first_name, "Authorization": token })
    }
});




module.exports = router;
