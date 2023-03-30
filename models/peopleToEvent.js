const mongoose = require('mongoose');


const ExtraSchema = mongoose.Schema({
    come: {
        type: Number,
        required: true
    },
    received: {
        type: Number,
        required: true
    },
    sms: {
        type: Number,
        required: true,
    },
    eventId: {
        type: String,
        required: true,
    },

})


const Extra = mongoose.model('Extra', ExtraSchema)
module.exports = Extra;