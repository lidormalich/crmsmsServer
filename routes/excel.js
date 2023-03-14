var express = require('express');
var router = express.Router();
const joi = require('joi');
var express = require("express");
const auth = require("../middlewares/auth");
const Event = require('../models/event');


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

const excelSchema = joi.object({
    data: joi.array().required(),

});
router.post("/add/:id", (req, res) => {
    console.log("H");
    const { error } = excelSchema.validate(req.body);
    if (error) { console.log(error); return res.status(400).send("Wrong body"); }

    // console.log(req.body);
    // res.json("Ok");
    console.log("H");
    console.log("H");


    const update = req.body
    console.log(update);
    let arryNew, temp;
    // for (let index = 0; index < update.length; index++) {
    //     temp = { PhoneNumber: update[index].Phone Number }
    //     arryNew.push()
    // }
    // eventy = Event.findOne({ _id: req.params.id })
    //     .then((data) => {
    //         let pepoleCome = data.pepoleCome;
    //         for (const people of req.body.data) {
    //             pepoleCome.push(people);
    //         }

    //         console.log("pepoleCome DATA");
    //         console.log(pepoleCome);
    //         Event.findOneAndUpdate({ _id: req.params.id }, { pepoleCome: pepoleCome }, { returnDocument: 'after' }, function (err, doc) {
    res.json(200); //IS OK
    //         })
    //     })
    //     .catch(err => res.json(err))
})

module.exports = router;
