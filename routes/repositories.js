const express = require("express");
const { getRepositories, createRepository, updateRepository, getRepositoryById } = require("../controllers/repositories");
const router = express.Router();
const {validatorCreateItem, validatorGetItem, validatorGetIdBody} = require('../validators/repositories')

router.get("/",getRepositories)

router.get("/:id",validatorGetItem, getRepositoryById)

router.post("/",validatorCreateItem,createRepository)

router.put("/",validatorGetIdBody,updateRepository)

module.exports = router;
