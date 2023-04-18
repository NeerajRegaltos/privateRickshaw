const mongoose = require("mongoose");

const RickshawSchema = new mongoose.Schema({
    "driverName": {
        type: String,
        required: true
    },
    "rickshawImage": {
        type: String,
        required: true
    },
    "riskShowNumber": {
        type: String,
        required: true
    },
    "amountPerDay": {
        type: Number,
        required: true
    },
    "amountPerHour": {
        type: Number,
        required: true
    },
    "tourDetail": [{
        "from": String,
        "to": String,
        "price": Number
    }],
    "timing": {
        "from": Number,
        "to": Number
    },
    "peopleCount": {
        type: Number,
        default: 2
    },
    userDetail: {
        type: mongoose.Types.ObjectId,
        ref: "AuthRegModel"
    }
}, { timestamps: true });

const RickshawModel = mongoose.model("Rickshaw", RickshawSchema);

module.exports = RickshawModel;