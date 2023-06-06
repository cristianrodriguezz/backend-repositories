const express = require("express");
const { getRepositories, createRepository, updateRepository, getRepositoryByUserId } = require("../controllers/repositories");
const router = express.Router();
const {validatorCreateItem, validatorGetItem, validatorGetIdBody} = require('../validators/repositories');
const { authMiddleware } = require("../middleware/session");
const { checkRol } = require("../middleware/checkRol");



router.get("/",getRepositories)

router.get("/:id",validatorGetItem, getRepositoryByUserId)

router.post("/",validatorCreateItem,createRepository)

router.put("/",authMiddleware,validatorGetIdBody,updateRepository)

module.exports = router;
