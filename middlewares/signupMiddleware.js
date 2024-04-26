const { body, validationResult } = require("express-validator");

const { customErrorResponse } = require("../config/customGlobalResponse");

const validateSignup = [
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("email").notEmpty().isEmail().withMessage("Email is required"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password should be at least 8 chars"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //Modify Custom Global Response
      customErrorResponse.success = false;
      customErrorResponse.error = errors.errors[0].msg;
      customErrorResponse.message = "User Validation Failed...";
      customErrorResponse.statusCode = 422;
      customErrorResponse.statusText = "Bad Request";

      //Sending Response
      return res.status(422).json(customErrorResponse);
    }
    next();
  },
];

module.exports = { validateSignup };
