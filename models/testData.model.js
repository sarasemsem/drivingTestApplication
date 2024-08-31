const { default: mongoose } = require("mongoose")

//const mongoose = require('mongoose');

const testDataSchema = new mongoose.Schema({
    testAppoinment: {
        type: Date,
        required: false,
    },
    MockTestScore: {
        type: Number,
        required: false,
    },
    beginTest: {
        type: Boolean,
        required: false,
    },
    adressMac: {
        type: String,
        required: false,
    }
},
    {
        timestamps: true
    }
);

const TestData = mongoose.model('TestData', testDataSchema);

module.exports = TestData;