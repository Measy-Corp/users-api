const { body, param, check, validationResult } = require('express-validator');

const validations = {
  
  "post": [
    body('id', 'id must be a valid UUID').isUUID(),
    body('orderId', 'orderId must be a valid UUID').isUUID(),
    body('productId', 'userId must be a valid UUID').isUUID(),
    body('quantity', 'status is empty').isInt(),
    body('unitPrice', 'unitPrice is invalid').isFloat({ min: 0.0 })
  ],

  "patch": [
    param('id', 'id must be a valid UUID').isUUID(),
    body('id', 'id can not be updated').isEmpty(),
    body('orderId', 'orderId must be a valid UUID').optional().isUUID(),
    body('productId', 'userId must be a valid UUID').optional().isUUID(),
    body('quantity', 'status is empty').optional().isInt(),
    body('unitPrice', 'unitPrice is invalid').optional().isFloat({ min: 0.0 })
  ],

  "idParam": [
    param('id', 'id must be a valid UUID').isUUID()
  ]
  
}

exports.getValidations = (validator) => {
  return validations[validator];
}