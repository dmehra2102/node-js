const { check, validationResult } = require("express-validator");

const registerationValidation = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check(
    "password",
    "Password must be 8 or more alphanumeric chcaracters"
  ).isLength({ min: 8 }),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send({ message: "Validation failed please check your input" });
  }
  next();
};

module.exports = { registerationValidation, validateRequest };
