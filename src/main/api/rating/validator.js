const { body, param, check, validationResult } = require('express-validator');

const validations = {

    "post": [
        body('id', 'id must be a valid UUID').isUUID(),
        body('storeId', 'storeId must be a valid UUID').isUUID(),
        body('userId', 'userId must be a valid UUID').isUUID(),
        body('score', 'score must be set between 1.0 and 5.0').isFloat({ min: 1.0, max: 5.0 })
    ],

    "patch": [
        param('id', 'id must be a valid UUID').isUUID(),
        body('storeId', 'can not change storeId').isEmpty(),
        body('userId', 'can not change userId').isEmpty(),
        body('score', 'score must be set between 1.0 and 5.0').isFloat({ min: 1.0, max: 5.0 })
    ],

    "idParam": [
        param('id', 'id must be a valid UUID').isUUID()
    ],

    "storeIdParam": [
        param('storeId', 'storeId must be set').exists()
    ]
    
}

exports.getValidations = (validator) => {
  return validations[validator];
}