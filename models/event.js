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
    }, userId: {
        type: String,
        required: true
    }, weddingSentence: {
        type: String,
        required: true

    }, weddingDate: {
        type: String,
        required: true
    }, eventsHall: {
        type: String,
        required: true
    }
})


const Event = mongoose.model('Event', EventSchema)
module.exports = Event
// export default Event;