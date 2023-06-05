const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator");

const validatorRegister = [
  check("name").exists().notEmpty().isLength({ min: 2, max: 99 }),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 4, max: 15 }),
  (res, req, next) => validateResults(res, req, next),
];
const validatorLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 4, max: 15 }),
  (res, req, next) => validateResults(res, req, next),
];

module.exports = { validatorRegister, validatorLogin };
