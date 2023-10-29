const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    markers: [{
        type: String,
    }]
});

module.exports = mongoose.model('User', userModel);