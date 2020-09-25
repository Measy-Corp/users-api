const { body, param, check, validationResult } = require('express-validator');

const validations = {

  "post": [
    body('id', 'id must be a valid UUID').isUUID(),
    body('storeId', 'storeId must be a valid UUID').isUUID(),
    body('userId', 'userId must be a valid UUID').isUUID(),
    body('status', 'status is empty').exists(),
    body('totalPrice', 'unitPrice is invalid').isFloat({ min: 0.0 })
  ],

  "patch": [
    param('id', 'id must be a valid UUID').isUUID(),
    body('id', 'id can not be updated').isEmpty(),
    body('storeId', 'storeId must be a valid UUID').optional().isUUID(),
    body('userId', 'userId must be a valid UUID').optional().isUUID(),
    body('totalPrice', 'totalPrice is invalid').optional().isFloat({ min: 0.0 })
  ],

  "idParam": [
    param('id', 'id must be a valid UUID').isUUID()
  ],

}

exports.getValidations = (validator) => {
  return validations[validator];
}