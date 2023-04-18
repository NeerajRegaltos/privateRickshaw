const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./database/db");
const router = require("./routes/rickshawRouter");
const loginRegRouter = require("./routes/AuthRouter");
const userRouter = require("./routes/userRouter");

app.use(express.json());

app.use("/api/", router);

//Auth routes - login and register
app.use("/api/auth/", loginRegRouter);

//user routes
app.use("/api/user/", userRouter);











//Listening to Server 
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
    connectDb(process.env.MONGO_URL);
});