var express = require('express');
var router = express.Router();
const joi = require('joi');
var express = require("express");
const Sentences = require('../models/sentence');


const loginSchema = joi.object({
    weddingSentence: joi.string().required().min(6)
});

router.get('/all', async (req, res, next) => {
    // let { error } = loginSchema.validate(req.body)
    // if (error) return res.status(400).send(error)

    Sentences.find()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(err => res.status(400).send(err))
});
router.post('/', async (req, res, next) => {
    let { error } = loginSchema.validate(req.body)
    if (error) return res.status(400).send(error)

    Sentences.create(req.body).then(() => {
        return res.status(200).send("Sentences save successfully")
    }).catch(err => {
        return res.status(400).send("couldn't save Sentences")
    })
});




module.exports = router;
