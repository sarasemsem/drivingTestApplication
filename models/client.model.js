const { default: mongoose } = require("mongoose")

//const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: String,
    phone: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    testAppoinment: {
        type: Date,
        required: false,
    },
    MockTestScore: {
        type: Number,
        required: false,
    },
},
    {
        timestamps: true
    }
);

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;