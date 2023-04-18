const express = require("express");
const { getUserDetails, deleteUser, updateUser } = require("../controllers/userControllers");
const validateToken = require("../middleware/validateToken");
const userRouter = express.Router();


userRouter.get("/:id", validateToken, getUserDetails);

userRouter.delete("/delete/:id", validateToken, deleteUser);

userRouter.patch("/update/:id", validateToken, updateUser);


module.exports = userRouter;