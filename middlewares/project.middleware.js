const { body } = require('express-validator');

exports.createProjectValidator = [
  body('name')
    .notEmpty().withMessage('Project name is required')
    .isLength({ min: 3 }).withMessage('Project name must be at least 3 characters long'),

  body('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),

  body('user')
    .notEmpty().withMessage('User is required')
    .isMongoId().withMessage('Invalid User ID'),
];
