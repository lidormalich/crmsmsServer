var express = require('express');
var router = express.Router();
var express = require("express");
const auth = require("../middlewares/auth");
const { updateSMS } = require('../service/updateSMS');
const { default: axios } = require('axios');


const options = { headers: { "content-type": "application/json" } };


const check = async (key, user, pass) => {
    let requesteObject = { key, user, pass };
    let balance = 0;
    try {
        let ab = await axios.post('https://api.sms4free.co.il/ApiSMS/AvailableSMS', requesteObject, options)
        balance = ab.data;
    } catch (error) {
        console.log(error);
    }
    return balance;
}


router.post('/OLD', auth, function (req, res, next) {
    const accountSid = process.env.ASID || '';
    const authToken = process.env.TOKEN || '';
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            body: req.body.message,
            from: '+12762849386',
            to: req.body.phone
            // to: null
        })
        .then(message => {
            console.log(message);
            console.log(message.errorCode);

            message.errorCode == null ? res.status(202).send("Sended") : res.status(404).send('Something broke! Error');
        });
    updateSMS(req.body.eventId, req.body.phone)
    // .done(() => res.json("SENDED"));
});
router.post('/', auth, async function (req, res, next) {
    const smsKEY = process.env.sms4freeKEY || '';
    const user = process.env.user || "";
    const pass = process.env.pass || "";
    const sender = 'CRMSMS';
    const msg = req.body.message;
    // const recipient = "+972526761204";
     const recipient = req.body.phone;


    let requesteObject = { key: smsKEY, user, pass, sender, recipient, msg };
    let successSend = false;

    let counter = await check(smsKEY, user, pass);
    console.log(counter);

    // data.status==200

    await axios.post('https://api.sms4free.co.il/ApiSMS/SendSMS', requesteObject, options)
        .then(data => {
            res.status(200).send("Sended")
            // successSend = true
        })
        .catch(error => { res.status(404).send(error) });

    // if (successSend && counter < check(smsKEY, user, pass)) {
    //     res.status(200).send("Sended");
    //     console.log("OK");
    // } else {
    //     res.status(404).send("Error Send Data");
    //     console.log("Fail");
    // }
});


module.exports = router;
