const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: String,
    userID: String,
    level: Number
});

module.exports = mongoose.model('Admin', adminSchema, 'admins');