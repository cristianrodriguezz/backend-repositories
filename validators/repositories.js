const { check } = require("express-validator");

const validatorCreateItem = [
  check("name")
  .exists()
  .notEmpty()
]

module.exports = {validatorCreateItem}