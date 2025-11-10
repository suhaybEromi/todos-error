import { body, param, validationResult } from "express-validator";

// 🟡 Shared validation error handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(e => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
};

// 🟢 Validation for create & update
export const validateTodo = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),

  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("problemSteps")
    .isArray({ min: 1 })
    .withMessage("Problem steps must be a non-empty array"),
  body("problemSteps.*")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Each problem step must be a non-empty string"),

  body("fixSteps")
    .isArray({ min: 1 })
    .withMessage("Fix steps must be a non-empty array"),
  body("fixSteps.*")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Each fix step must be a non-empty string"),

  body("code").optional().isString().trim(),
  body("status")
    .isIn(["In Progress", "Complete"])
    .withMessage("Invalid status value"),

  body("type")
    .trim()
    .isString()
    .withMessage("Type must be a string")
    .notEmpty()
    .withMessage("Type is required"),
];

// 🟢 Validation for :id params
export const validateId = [
  param("id").isMongoId().withMessage("Invalid Todo ID"),
];
