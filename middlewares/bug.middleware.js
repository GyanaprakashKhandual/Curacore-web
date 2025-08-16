const { body } = require('express-validator');

exports.createBugValidator = [
  body('bugType')
    .notEmpty().withMessage('Bug type is required')
    .isIn(['Functional', 'User-Interface', 'Performance', 'Security', 'Database', 'API'])
    .withMessage('Invalid bug type'),

  body('bugModule')
    .optional()
    .isString().withMessage('Bug module must be a string'),

  body('bugDescription')
    .optional()
    .isString().withMessage('Bug description must be a string'),

  body('refLink')
    .optional()
    .isURL().withMessage('Reference link must be a valid URL'),

  body('requirement')
    .optional()
    .isString().withMessage('Requirement must be a string'),

  body('severity')
    .optional()
    .isIn(['High', 'Medium', 'Low'])
    .withMessage('Severity must be High, Medium, or Low'),

  body('priority')
    .optional()
    .isIn(['High', 'Medium', 'Low'])
    .withMessage('Priority must be High, Medium, or Low'),

  body('status')
    .optional()
    .isIn(['Open', 'Ongoing', 'Closed', 'Reopen'])
    .withMessage('Status must be Open, Ongoing, Closed, or Reopen'),
];
