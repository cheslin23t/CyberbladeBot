const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
    welcomeMessageEnabled: Boolean,
    welcomeMessage: String,
    serverID: String,
    sendTo: Number
});

module.exports = mongoose.model('Server', serverSchema, 'servers');