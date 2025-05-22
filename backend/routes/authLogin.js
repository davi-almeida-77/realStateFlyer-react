const express = require("express");
const router = express.Router();
const authController = require("../controllers/LoginController");

router.post("/login", authController.login_user);


module.exports = router;