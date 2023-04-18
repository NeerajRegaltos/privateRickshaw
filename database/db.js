const mongoose = require("mongoose")

const connectDb = (mongoUrl) => {
    mongoose.connect(mongoUrl)
        .then(() => {
            console.log("CONNECTED TO DB");
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = connectDb;