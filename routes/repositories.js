const express = require("express");
const { getRepositories, createRepository, updateRepository, getRepositoryById } = require("../controllers/repositories");
const router = express.Router();
const {validatorCreateItem, validatorGetItem, validatorGetIdBody} = require('../validators/repositories');
const { authMiddleware } = require("../middleware/session");
const { checkRol } = require("../middleware/checkRol");

router.get("/",authMiddleware,getRepositories)

router.get("/:id",validatorGetItem, getRepositoryById)

router.post("/",authMiddleware,checkRol(['admin','user']),validatorCreateItem,createRepository)

router.put("/",validatorGetIdBody,updateRepository)

module.exports = router;
