const express = require("express");
const router = express.Router();
const { createRide, getAllRides, deleteRide, singleRide, updateRide } = require("../controllers/rickshawControllers");
const validateToken = require("../middleware/validateToken");


router.get("/allrides", validateToken, getAllRides)

router.post("/createride", validateToken, createRide)

router.delete("/deleteride/:id", validateToken, deleteRide)

router.patch("/updateride/:id", validateToken, updateRide)

router.get("/singleride/:id", validateToken, singleRide)

module.exports = router;