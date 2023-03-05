var express = require('express');
var router = express.Router();
var express = require("express");
const auth = require("../middlewares/auth");

router.post('/', auth, function (req, res, next) {
    const accountSid = process.env.ASID || '';
    const authToken = process.env.TOKEN || '';
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            body: req.body.message,
            from: '+12762849386',
            to: req.body.phone
        })
        .then(message => { console.log(message); console.log(message.errorCode); message.errorCode == null ? res.status(202).send("Sended") : res.status(404).send('Something broke! Error') });
    // .done(() => res.json("SENDED"));
});

module.exports = router;
