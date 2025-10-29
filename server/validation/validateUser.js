import { body, validationResult } from "express-validator";

// Validation chain for signup
export const validateSignup = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("username must not be less than 3 characters")
    .escape(),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
];

export const validateSignin = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),

  body("password").exists().withMessage("Password is required"),
];

// Middleware to check validation result
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};
