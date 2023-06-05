const { check } = require("express-validator");
const {validateResults} = require("../utils/handleValidator");

const validatorCreateItem = [
  check("name").exists().notEmpty(),
  check("lastName").exists().notEmpty(),
  check("photo").exists().notEmpty(),
  check("work").exists().notEmpty(),
  check("country").exists().notEmpty(),
  check("modality").exists().notEmpty(),
  check("experience").exists().notEmpty(),
  check("portfolio").exists().notEmpty(),
  check("userId").exists().notEmpty().isMongoId(),
  (res, req, next) => validateResults(res, req, next)
];

const validatorGetItem = [
  check("id").exists().notEmpty().isMongoId(),
  (res, req, next) => validateResults(res, req, next)
];
const validatorGetIdBody = [
  check("_id").exists().notEmpty().isMongoId(),
  (res, req, next) => validateResults(res, req, next)
];

module.exports = { validatorCreateItem, validatorGetItem , validatorGetIdBody};
