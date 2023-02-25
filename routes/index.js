var express = require('express');
const Event = require('../models/event');
// const SMS = require('../routes/sendsms');
var router = express.Router();
const bcrypt = require('bcrypt');
var express = require("express");
const User = require('../models/usersmodel');



/* GET home page. */
router.get('/lidor', function (req, res, next) {
    console.log("lidor is the king");
    res.json('lidor OK');
});
// router.get('/lidorsms', function (req, res, next) {
//     // SMS
//     var _sms = new SMS.sms();
//     _sms.sendSms("recipientCellNumber", "test 111\n עברית");
// });

// Create event
router.post('/event', function (req, res, next) {
    Event.create(req.body)
        .then((data) => res.json(data))
        .catch(err => res.json(err))

});


// Add pepole to event
router.patch('/addpepole/:id', function (req, res, next) {
    const update = req.body
    eventy = Event.findOne({ _id: req.params.id })
        .then((data) => {
            Event.findOneAndUpdate({ _id: req.params.id }, { pepoleCome: [...data.pepoleCome, req.body] }, { returnDocument: 'after' }, function (err, doc) {
                res.json(200); //IS OK
            })
        })
        .catch(err => res.json(err))
});
// New group -OKKKKKK
router.patch('/group/:id', function (req, res, next) {
    const update = req.body
    eventy = Event.findOne({ _id: req.params.id })

        .then((data) => {
            Event.findOneAndUpdate({ _id: req.params.id }, { group: [...data.group, req.body] }, { returnDocument: 'after' }, function (err, doc) {
                res.json(200); //IS OK
            })
        })
        .catch(err => res.json(err))
});
// get All pepole in event OKKKKKKKKKKKKKKKKKK
router.get('/getPeople/:id', function (req, res, next) {
    const id = req.body
    eventy = Event.findById({ _id: req.params.id })
        .then((data) => {
            // console.log("OK");
            Event.findById({ _id: req.params.id }, { returnDocument: 'after' }, function (err, doc) {
                res.json(data.pepoleCome); //IS OK
            })
        })
        .catch(err => res.json(err))
});
// get All group
router.get('/getgroup/:id', function (req, res, next) {
    const id = req.body
    eventy = Event.findById({ _id: req.params.id })
        .then((data) => {
            Event.findById({ _id: req.params.id }, { returnDocument: 'after' }, function (err, doc) {
                res.json(data.group); //IS OK
            })
        })
        .catch(err => res.json(err))
});


// Delete Pepole-OK
router.patch('/deletepepole/:id', function (req, res, next) {
    const phoneNumToDelete = req.body
    eventy = Event.findOne({ _id: req.params.id })
        .then((data) => {
            let pepoleCome = data.pepoleCome
            let index = pepoleCome.filter((e) => e.phoneNumber == phoneNumToDelete)
            pepoleCome.splice(index, 1)
            Event.findOneAndUpdate({ _id: req.params.id }, { pepoleCome: pepoleCome }, { returnDocument: 'after' }, function (err, doc) {
                res.json(200); //IS OK
            })
        })
        .catch(err => res.json(err))
});
// Delete group-OK
router.patch('/deletegroup/:id', function (req, res, next) {
    const groupToDelete = req.body
    eventy = Event.findOne({ _id: req.params.id })
        .then((data) => {
            let group = data.group
            let index = group.filter((e) => e.group == groupToDelete)
            group.splice(index, 1)
            Event.findOneAndUpdate({ _id: req.params.id }, { group: group }, { returnDocument: 'after' }, function (err, doc) {
                res.json(200); //IS OK
            })
        })
        .catch(err => res.json(err))
});
// get spicific peopole-WORK
router.get('/getoneepepole/:id', function (req, res, next) {
    const phoneNumToGet = req.body
    eventy = Event.findOne({ _id: req.params.id })
        .then((data) => {
            let pepoleCome = data.pepoleCome
            let peopleInfo = pepoleCome.filter((e) => e.phoneNumber != phoneNumToGet)
            Event.findOneAndUpdate({ _id: req.params.id }, { returnDocument: 'after' }, function (err, doc) {

                res.json(peopleInfo[0]);
            })
        })
        .catch(err => res.json(err))
});

// update Pepole
router.patch('/updatepepole/:id', function (req, res, next) {
    // console.log("Hare");
    const update = req.body
    console.log(update);
    eventy = Event.findOne({ _id: req.params.id })
        .then((data) => {
            let pepoleCome = data.pepoleCome
            let index = pepoleCome.filter((e) => e.phoneNumber == update.phoneNumber)
            pepoleCome.splice(index, 1)
            pepoleCome.push(update)
            Event.findOneAndUpdate({ _id: req.params.id }, { pepoleCome: pepoleCome }, { returnDocument: 'after' }, function (err, doc) {
                // console.log(pepoleCome);
                res.json(data); //IS OK
            })
        })
        .catch(err => res.json(err))
});

// get all event id and info
router.get('/allEvent', function (req, res, next) {
    Event.find({}, ["_id", "uuid", "campaignName", "ownerName", "phone"])
        .then((data) => {
            res.json(data)
        })
        .catch(err => res.json(err))
});
// get  event info by id
router.get('/eventinfo/:id', function (req, res, next) {
    Event.findOne({ _id: req.params.id }, ["uuid", "campaignName", "ownerName", "phone", "bride", "groom"])
        .then((data) => {
            res.json(data)
            // console.log(data);
        })
        .catch(err => { console.log("fail"); res.json({ fail: undefined }) })
});

// delete event
router.delete('/deleteEvent/:id', function (req, res, next) {
    Event.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json("Evenet delteed"))
        .catch(err => res.json(err))
});
router.patch('/sendsms', function (req, res, next) {
    const accountSid = 'ACd0bc34c963f913edc3194674098c0ad0';
    const authToken = process.env.TOKEN || '';
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: 'TEST 1',
            from: '+12762849386',
            to: '+972526761204'
        })
        .then(message => console.log(message.sid))
        .done();
});

/////////////////////register and login
router.post('/register', async function (req, res, next) {
    // console.log(req.body);
    const { first_name, last_name, email } = req.body
    let { password } = req.body
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
            res.json({
                "error": false,
                "message": "user registered successfully"
            })
        }).catch(err => {
            res.json({
                "error": true,
                "message": "couldn't register user",
                "m": err

            })
        })

    } else {
        res.json({
            "error": true,
            "message": "user already registered"
        })
    }


});

router.post('/login', async function (req, res, next) {
    // console.log(req.body);
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user) {
        const result = await bcrypt.compare(password, user.password)
        // console.log(result);
        if (result) {
            res.json({
                "error": false,
                "message": "login successfully",
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": email
            })
        } else {

            res.json({
                "error": true,
                "message": "email or password is wrong"
            })
        }
    }
});




module.exports = router;
