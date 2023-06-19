const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator");

const validatorId = [
  check("id").exists().notEmpty().isMongoId(),
  (res, req, next) => validateResults(res, req, next),
];

module.exports = { validatorId }
