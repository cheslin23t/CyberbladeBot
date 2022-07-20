const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    question: String,
    ownerID: String,
    messageID: String,
    yes: Number,
    no: Number,
    ended: Boolean,
    createdAt: Number,

});

module.exports = mongoose.model('Poll', pollSchema, 'polls');