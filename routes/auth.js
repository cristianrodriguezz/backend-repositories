const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUser, updateUser, getAllRepositories, getRepositorieById, addFav , deleteAdd} = require("../controllers/users");

const  { validatorRegister, validatorLogin } = require('../validators/auth')


router.post("/register",validatorRegister,registerUser)
router.post("/login",validatorLogin, loginUser)
router.get("/user", getAllUser)
router.get("/repositorie/:id", getRepositorieById)
router.get("/repositories", getAllRepositories)
router.patch("/repositories/:id",updateUser)
router.patch("/fav/:id", addFav)
router.delete("/fav/:id", deleteAdd)



module.exports = router;

