var express = require('express');
const Event = require('../models/event');
// const SMS = require('../routes/sendsms');
var router = express.Router();
const bcrypt = require('bcrypt');
var express = require("express");
const User = require('../models/usersmodel');
const auth = require("../middlewares/auth");




/* GET home page. */
router.get('/lidor', function (req, res, next) {
    console.log("lidor is the king");
    res.json('lidor OK');
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



// Delete group-not tested
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
// // get spicific peopole-WORK
router.get('/getoneepepole/:id/:phone', function (req, res, next) {
    const phoneNumToGet = req.params.phone
    console.log(phoneNumToGet + "Phone");
    eventy = Event.findOne({ _id: req.params.id })
        .then((data) => {
            let pepoleCome = data.pepoleCome
            const found = pepoleCome.find((e) => e.phoneNumber == phoneNumToGet);

            res.json(found);
            console.log(found);
        })
        .catch(err => res.json(err))
});


// get  event info by id
router.get('/eventinfo/:id', function (req, res, next) {
    Event.findOne({ _id: req.params.id }, ["uuid", "campaignName", "ownerName", "phone", "bride", "groom", "brideParents", "groomParents", "coupleImage", "weddingSentence", "weddingDate", "eventsHall"])
        .then((data) => {
            let dateNew = data.weddingDate.toString().split("-");
            data.weddingDate = dateNew[2] + "-" + dateNew[1] + "-" + dateNew[0];
            res.status(200).send(data);
        })
        .catch(err => { console.log(err); res.status(400).send(err) })
});

// // delete event
// router.delete('/deleteEvent/:id', function (req, res, next) {
//     Event.findOneAndDelete({ _id: req.params.id })
//         .then(() => res.json("Evenet delteed"))
//         .catch(err => res.json(err))
// });



module.exports = router;
