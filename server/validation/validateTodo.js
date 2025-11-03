import { body, param, validationResult } from "express-validator";

// Reusable error handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

// Validate Todo creation & update
export const validateTodo = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 250 })
    .withMessage("Title must be 3–250 characters"),

  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("problemSteps")
    .trim()
    .notEmpty()
    .withMessage("Problem steps are required"),

  body("fixSteps").trim().notEmpty().withMessage("Fix steps are required"),

  body("code").trim().isLength({ min: 1 }).withMessage("Code is required"),

  body("status")
    .isIn(["pending", "resolved"])
    .withMessage("Status must be 'pending' or 'resolved'"),
];

// Validate ID param
export const validateId = [
  param("id").isMongoId().withMessage("Invalid Todo ID"),
];
