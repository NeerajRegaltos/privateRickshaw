const RickshawModel = require("../model/rickshawModel.js");

const getAllRides = async (req, res) => {
    try {
        const rides = await RickshawModel.find({});
        if (rides.length > 0) {
            console.log("GOT ALL RIDES SUCCESSFULLY")
            res.json(rides);
        } else {
            res.json({ "result": "Cannot find Rides, Please Try again ." });
        }

    } catch (error) {
        console.log(error);
    }
}


const createRide = async (req, res) => {
    try {
        const id = req.user._id;
        const saveRickshaw = new RickshawModel({ ...req.body, userDetail: id });


        const x = await saveRickshaw.save();

        const data = {
            result: "SUCCESS",
            ...x
        }
        console.log("CREATED SUCCESSFULLY")
        res.json(data);


        // res.json({ result: "USER IS NOT AVAILABLE" });




    } catch (error) {
        console.log(error);
    }
}


const deleteRide = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleted = await RickshawModel.findByIdAndDelete({ _id })
        if (deleted !== null) {
            console.log("DEleted SUCCESSFULLY")
            res.json(deleted);
        } else {
            res.json({ result: "Please delete a valid Ride" });
        }


    } catch (error) {
        console.log(error);
    }
}


const updateRide = async (req, res) => {
    try {
        const id = req.params.id;
        const updateRide = await RickshawModel.findByIdAndUpdate(id, { ...req.body });
        if (updateRide !== null) {
            console.log("UPdated SUCCESSFULLY")
            res.json({ result: "Updated Ride Successfully" });
        } else {
            res.json({ result: "Please Update a valid Ride" });
        }

    } catch (error) {
        console.log(error);
    }
}

const singleRide = async (req, res) => {
    try {
        const _id = req.params.id;
        const ride = await RickshawModel.findById({ _id });
        if (ride != null) {
            console.log("GOt Single Ride SUCCESSFULLY")
            res.json(ride);
        } else {
            res.json({ result: "Invalid Ride !!!" });
        }


    } catch (error) {
        console.log(error);
    }
}



module.exports = { createRide, getAllRides, deleteRide, singleRide, updateRide };