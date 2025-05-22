const express = require("express");
const router = express.Router();
const authController = require("../controllers/registerController");

router.post("/register", authController.register_user);


module.exports = router;