const RickshawModel = require("../model/rickshawModel.js");
const UserModel = require("../model/authSignUpModel");

const getUserDetails = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserModel.findById(id);
        if (user === null) {
            res.json({ result: "User is Not available" });
        } else {
            const rickshaw = await RickshawModel.find({ userDetail: id });
            console.log("Got the User SUCCESSFULLY");
            res.json({ ...user, rickshaw });
        }

    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await UserModel.findByIdAndDelete(id);
        if (user === null) {
            res.json({ result: "User is already deleted" });
        } else {
            const rickshaws = await RickshawModel.find({ userDetail: id });
            if (rickshaws.length > 0) {
                for (let rickshaw of rickshaws) {
                    const id = rickshaw._id;
                    await RickshawModel.findByIdAndDelete(id);
                }
            }
            res.json({ result: "User has been deleted" });
        }
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findByIdAndUpdate(id, { ...req.body });
        
        if (user === null) {
            res.json({ result: "User is not available" });
        } else {
            res.json({ result: "USER UPDATED SUCCESSFULLY" });
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUserDetails, deleteUser, updateUser };