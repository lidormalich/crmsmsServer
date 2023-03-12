const mongoose = require('mongoose');
// import mongoose from "mongoose";


const SentencesSchema = mongoose.Schema({
    weddingSentence: {
        type: String,
        required: true
    },
})


const Sentences = mongoose.model('Sentence', SentencesSchema)
module.exports = Sentences