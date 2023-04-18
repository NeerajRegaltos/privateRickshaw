const UserModel = require("../model/authSignUpModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        if (!phone || !password) {
            if (!phone) {
                res.json({ result: "Please Provide Phone Number" });
            }
            if (!password) {
                res.json({ result: "Please Provide password" });
            }
        }
        if (String(phone).length === 10) {
            const isPhone = await UserModel.findOne({ phone });
            if (isPhone === null) {
                //No PERSON EXIST , say him to register
                res.json({ result: "USER Does not exist , please REGISTER" });
            }
            else {
                // We can say login
                const pass = await bcrypt.compare(password, isPhone.password);
                delete isPhone._doc.password;
                const accessToken = jwt.sign({
                    ...isPhone._doc
                }, process.env.SECRET, { expiresIn: "5h" });

                if (pass) {
                    res.json({ accessToken });
                } else {
                    res.json({ result: "WRONG PASSWORD" });
                }
            }
        } else {
            res.json({ result: "Phone Length should be 10" });
        }
    } catch (error) {
        console.log(error);
    }
}

const registerUser = async (req, res) => {
    try {
        const { phone, password, email } = req.body;
        if (!phone || !password || !email) {
            if (!phone) {
                res.json({ result: "Please Provide Phone Number" });
            }
            if (!email) {
                res.json({ result: "Please Provide email " });
            }
            if (!password) {
                res.json({ result: "Please Provide password" });
            }
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (String(phone).length === 10) {
            const isPhone = await UserModel.findOne({ phone });
            if (isPhone === null) {
                //we can create contact
                const user = new UserModel({ ...req.body, password: hashedPassword });
                const savedUser = await user.save();
                res.json(savedUser);
            }
            else {
                // can't create contact because already present
                res.json({ result: "USER ALREADY REGISTED with this Phone Number" });
            }
        } else {
            res.json({ result: "Phone Length should be 10" });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { loginUser, registerUser };




