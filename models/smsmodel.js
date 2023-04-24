const mongoose = require('mongoose');
// import mongoose from "mongoose";


const SMSSchema = mongoose.Schema({
    eventId: {
        type: String,
        required: true,
    },
    smsSendTo: {
        type: [],
        required: false
    },
})


const SMS = mongoose.model('SMS', SMSSchema)
module.exports = SMS;