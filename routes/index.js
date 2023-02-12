var express = require('express');
const Event = require('../models/event');
var router = express.Router();
const bcrypt = require('bcrypt');
var express = require("express");
const User = require('../models/usersmodel');



/* GET home page. */
router.get('/lidor', function (req, res, next) {
    console.log("lidor is the king");
    res.json('lidor');
});

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

// Delete Pepole
router.patch('/deletepepole/:id', function (req, res, next) {
    const update = req.body
    eventy = Event.findOne({ _id: req.params.id })
        .then((data) => {
            let pepoleCome = data.pepoleCome
            let index = pepoleCome.findIndex(update.phone)
            pepoleCome.splice(index, 1)
            Event.findOneAndUpdate({ _id: req.params.id }, { pepoleCome: pepoleCome }, { returnDocument: 'after' }, function (err, doc) {
                res.json(200); //IS OK
            })
        })
        .catch(err => res.json(err))
});

// update Pepole
router.patch('/updatepepole/:id', function (req, res, next) {
    const update = req.body
    eventy = Event.findOne({ _id: req.params.id })
        .then((data) => {
            let pepoleCome = data.pepoleCome
            let index = pepoleCome.findIndex(update.phone)
            pepoleCome.splice(index, 1)
            pepoleCome.push(update)
            Event.findOneAndUpdate({ _id: req.params.id }, { pepoleCome: pepoleCome }, { returnDocument: 'after' }, function (err, doc) {
                res.json(200); //IS OK
            })
        })
        .catch(err => res.json(err))
});

// get all event id and info
router.get('/allEvent', function (req, res, next) {
    Event.find({}, ["uuid", "campaignName", "ownerName", "phone"])
        .then((data) => {
            res.json(data)
        })
        .catch(err => res.json(err))
});

// delete event
router.delete('/deleteEvent/:id', function (req, res, next) {
    Event.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json("Evenet delteed"))
        .catch(err => res.json(err))
});











/////////////////////register and login
router.post('/register', async function (req, res, next) {
    console.log(req.body);
    const { first_name, last_name, email } = req.body
    let { password } = req.body
    const userExists = await User.findOne({ email });

    console.log(first_name + " " + last_name);
    if (!userExists) {
        password = await bcrypt.hash(password, 10)
        const user = {
            first_name,
            last_name,
            email,
            password
        }
        console.log(email + " nbc" + password);
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
    console.log(req.body);
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user) {
        const result = await bcrypt.compare(password, user.password)
        console.log(result);
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
