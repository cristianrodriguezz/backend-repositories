const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/users");

const  { validatorRegister, validatorLogin } = require('../validators/auth')


router.post("/register",validatorRegister,registerUser)
router.post("/login",validatorLogin, loginUser)


module.exports = router;
