const { body, param, check, validationResult } = require('express-validator');

const validations = {

  'post': [
    body('id', 'id must be a valid UUID').isUUID(),
    body('email', 'email is invalid').isEmail(),
    body('username', 'username must be at least 5 chars long').isLength({ min: 5 }),
    body('password', 'password must be at least 5 chars long').isLength({ min: 5 }),
    body('firstName', 'firstName must be set').optional(),
    body('phone', 'phone must be numeric').optional().isInt(),
  ],

  'patch': [
    param('id', 'id must be a valid UUID').isUUID(),
    body('id', 'id is not updateable').isEmpty(),
    body('username', 'username is not updateable').isEmpty(),
    body('email', 'email is invalid').optional().isEmail(),
    body('password', 'password must be at least 5 cahrs long').optional().isLength({ min: 5 }),
    body('phone', 'phone must be numeric').optional().isInt(),
  ],

  'idParam': [
    param('id', 'id must be a valid UUID').isUUID(),
  ],

  'usernameParam': [
    param('username', 'username must be set').exists(),
  ]

}

exports.getValidations = (validator) => {
  return validations[validator];
}