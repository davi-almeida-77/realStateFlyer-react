const express = require("express");
const router = express.Router();

const authRoute =  require("./authRegister");

router.use("/api/auth", authRoute)

module.exports = router;