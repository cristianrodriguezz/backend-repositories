const express = require("express");
const router = express.Router();
const { addFav, getAllFavs } = require("../controllers/favs");
const { authMiddleware } = require("../middleware/session");
const { validatorId } = require("../validators/favs");

router.post("/:id", validatorId, authMiddleware, addFav);
router.get("/:id", validatorId, authMiddleware, getAllFavs);

module.exports = router;
