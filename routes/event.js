var express = require('express');
var router = express.Router();
const joi = require('joi');
var express = require("express");
const auth = require("../middlewares/auth");
const Event = require('../models/event');




const loginSchema = joi.object({
    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(8),
});

// router.post('/', async function (req, res, next) {
//     // joi validation
//     const { email, password } = req.body
//     const { error } = loginSchema.validate({ email, password });
//     if (error) return res.status(400).send("Wrong body");

// Create event
router.post('/', auth, async function (req, res, next) {
    Event.create({ ...req.body, userId: req.payload._id })
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
// get All pepole in event OKKKKKKKKKKKKKKKKKK
router.get('/getPeople/:id', function (req, res, next) {
    const id = req.body
    eventy = Event.findById({ _id: req.params.id })
        .then((data) => {
            Event.findById({ _id: req.params.id }, { returnDocument: 'after' }, function (err, doc) {
                res.json(data.pepoleCome); //IS OK
            })
        })
        .catch(err => res.json(err))
});

// Delete Pepole-OK
router.patch('/deletepepole/:id', function (req, res, next) {
    const phoneNumToDelete = req.body.phoneNum
    eventy = Event.findOne({ _id: req.params.id })
        .then((data) => {
            let pepoleCome = data.pepoleCome;
            let index;
            for (let i = 0; i < pepoleCome.length; i++) {
                // console.log(pepoleCome[i].phoneNumber);
                if (pepoleCome[i].phoneNumber === phoneNumToDelete) {
                    index = i;
                }
            }

            // console.log(index + "INDEX");
            pepoleCome.splice(index, 1)
            // console.log(pepoleCome);
            Event.findOneAndUpdate({ _id: req.params.id }, { pepoleCome: pepoleCome }, { returnDocument: 'after' }, function (err, doc) {
                res.json(200); //IS OK
            })
        })
        .catch(err => res.json(err))
});
// get spicific peopole-WORK
router.get('/getoneepepole/:id/:phone', function (req, res, next) {
    const phoneNumToGet = req.params.phone
    // console.log(phoneNumToGet + "Phone");
    Event.findOne({ _id: req.params.id })
        .then((data) => {
            let pepoleCome = data.pepoleCome
            const found = pepoleCome.find((e) => e.phoneNumber == phoneNumToGet);

            res.json(found);
            // console.log(found);
        })
        .catch(err => res.json(err))
});

// update Pepole
router.patch('/updatepepole/:id', function (req, res, next) {
    const update = req.body
    Event.findOne({ _id: req.params.id })
        .then((data) => {
            let pepoleCome = data.pepoleCome;
            let index;

            for (let arryIndex in pepoleCome) {
                if (pepoleCome[arryIndex].phoneNumber === update.phoneNumber) {
                    index = arryIndex;
                    break;
                }
            }
            pepoleCome.splice(index, 1)
            pepoleCome.push(update)
            Event.findOneAndUpdate({ _id: req.params.id }, { pepoleCome: pepoleCome }, { returnDocument: 'after' }, function (err, doc) {
                res.json(data); //IS OK
            })
        })
        .catch(err => res.json(err))
});

router.patch('/img/:id', function (req, res, next) {
    const update = req.body.data.coupleImage
    eventy = Event.findOne({ _id: req.params.id })
        .then((data) => {
            Event.findOneAndUpdate({ _id: req.params.id }, { coupleImage: update }, { returnDocument: 'after' }, function (err, doc) {
                res.json(data); //IS OK
            })
        })
        .catch(err => res.json(err))
});
// get couple Image
router.get('/img/:id', function (req, res, next) {
    eventy = Event.findOne({ _id: req.params.id }, ["_id", "coupleImage"])
        .then((data) => {
            res.json(data); //IS OK    
        })
        .catch(err => res.json(err))
});
// get all event id and info
router.get('/allEvent', auth, async (req, res, next) => {
    Event.find({ userId: req.payload._id }, ["_id", "uuid", "campaignName", "ownerName", "phone", "bride", "groom", "brideParents", "groomParents", "coupleImage"])
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
module.exports = router;
