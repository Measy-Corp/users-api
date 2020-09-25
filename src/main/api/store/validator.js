const { body, param, check, validationResult } = require('express-validator');

const validations = {

  "post": [
    body('id', 'id must be a valid UUID').isUUID(),
    body('ownerId', 'ownerId must be a valid UUID').isUUID(),
    body('document', 'document must be set').exists(),
    body('name', 'name must have a min. length of 3').isLength({ min: 3 }),
    body('phone', 'name must be set').exists(),
    body('address', 'category must be set').exists(),
    body('email', 'email is invalid').isEmail(),
    body('type', 'type must be set').exists(),
  ],

  "patch": [
    param('id', 'id must be a valid UUID').isUUID(),
    body('id', 'id is not updateable').isEmpty(),
    body('ownerId', 'ownerId must be a valid UUID').optional().isUUID(),
    body('document', 'document must be set').optional().exists(),
    body('name', 'name must have a min. length of 3').optional().isLength({ min: 3 }),
    body('phone', 'name must be set').optional().exists(),
    body('address', 'category must be set').optional().exists(),
    body('email', 'email is invalid').optional().isEmail(),
    body('type', 'type must be set').optional().exists(),
  ],

  "idParam": [
    param('id', 'id must be a valid UUID').isUUID(),
  ],

  "nameParam": [
    param('name', 'name must have a length of at least 4').isLength({ min: 4 }),
  ],

  "typeParam": [
    param('type', 'type must be set').exists(),
  ],
  
}

exports.getValidations = (validator) => {
  return validations[validator];
}