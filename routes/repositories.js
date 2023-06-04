const express = require("express");
const { getRepositories, createRepositorie, updateRepositorie } = require("../controllers/repositories");
const router = express.Router();

router.get("/",getRepositories)
router.post("/",createRepositorie)
router.put("/",updateRepositorie)

module.exports = router;
