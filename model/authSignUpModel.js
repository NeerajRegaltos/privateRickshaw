const mongoose = require("mongoose");

const AuthRegSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
        maxLength : 10
    },
    email: {
        type: String,
        requied: true,
    },
    password: {
        type: String,
        required: true
    },
    isDriver: {
        type: Boolean,
        default: false
    },
    rickShawDetail: {
        type: mongoose.Types.ObjectId,
        ref: "RickshawModel"
    }
}, { timestamps: true });

const AuthRegModel = mongoose.model("User", AuthRegSchema);

module.exports = AuthRegModel;