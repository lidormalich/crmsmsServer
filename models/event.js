const mongoose = require('mongoose');
// import mongoose from "mongoose";


const EventSchema = mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    campaignName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    bride: {
        type: String,
        required: true
    },
    groom: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    groomParents: {
        type: String,
        required: true
    },
    brideParents: {
        type: String,
        required: true
    },
    coupleImage: {
        type: String,
        required: false
    },
    pepoleCome: {
        type: [],
        required: false
    },
    group: {
        type: [],
        required: false
    }
})


const Event = mongoose.model('Event', EventSchema)
module.exports = Event
// export default Event;