const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
    name: String,
    userID: String,
    level: String
});

module.exports = mongoose.model('Server', serverSchema, 'servers');