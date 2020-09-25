const { body, param, check, validationResult } = require('express-validator');

const validations = {

  "post": [
    body('id', 'id must be a valid UUID').isUUID(),
    body('storeId', 'storeId must be a valid UUID').isUUID(),
    body('name', 'name must have a min. length of 3').isLength({ min: 3 }),
    body('description', 'name must have a min. length of 10').isLength({ min: 10 }),
    body('category', 'category is empty').exists(),
    body('unitPrice', 'unitPrice is invalid').isFloat({ min: 0.0 })
  ],

  "patch": [
    param('storeId', 'storeId must be a valid UUID').isUUID(),
    body('storeId', 'storeId can not be changed').isEmpty(),
    body('name', 'name must have a min. length of 3').optional().isLength({ min: 3 }),
    body('description', 'name must have a min. length of 10').optional().isLength({ min: 10 }),
    body('category', 'category is empty').optional(),
    body('unitPrice', 'unitPrice is invalid').optional().isFloat({ min: 0.0 })
  ],

  "idParam": [
    param('id', 'id must be a valid UUID').isUUID()
  ]
  
}

exports.getValidations = (validator) => {
  return validations[validator];
}