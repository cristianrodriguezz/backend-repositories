const express = require("express");
const { getRepositories, createRepository, updateRepository, getRepositoryById } = require("../controllers/repositories");
const router = express.Router();
const {validatorCreateItem, validatorGetItem, validatorGetIdBody} = require('../validators/repositories');
const { authMiddleware } = require("../middleware/session");
const { checkRol } = require("../middleware/checkRol");
const cors = require('cors')

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get("/",cors(corsOptions),getRepositories)

router.get("/:id",validatorGetItem, getRepositoryById)

router.post("/",authMiddleware,checkRol(['admin','user']),validatorCreateItem,createRepository)

router.put("/",validatorGetIdBody,updateRepository)

module.exports = router;
