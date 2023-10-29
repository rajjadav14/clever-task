const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const markerModel = new Schema({
    address: {
        type: String,
    },
    latitude: {
        type: String,
        required: true,
        unique: true,
    },
    longitude: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Marker', markerModel);