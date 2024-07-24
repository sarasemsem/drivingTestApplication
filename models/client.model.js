const { default: mongoose } = require("mongoose")

//const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: String,
    phone: String,
    address: {
        type: String,
        required: false,
    },
},
    {
        timestamps: true
    }
);

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;