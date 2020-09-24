const { body, param, check, validationResult } = require('express-validator');
const Product = require('../../infrastructure/models/product');

const validators = {
  "basic": [
    body('id','id must be a valid UUID').isUUID(),
    check('id').custom((value, { req }) => {
      return Product.findByPk(value).then(product => {
        if (product) {
            return Promise.reject('id already exists');
        }
      })
    }),
    body('storeId','storeId must be a valid UUID').isUUID(),
    body('name', 'name must have a min. length of 3').isLength({ min: 3 }),
    body('description', 'name must have a min. length of 10').isLength({ min: 10 }),
    body('category', 'category is empty').exists(),
    body('unitPrice', 'unitPrice is invalid').isFloat({ min: 0.0 })
  ],
  "patch": [
    body('storeId','storeId must be a valid UUID').isUUID(),
    body('name', 'name must have a min. length of 3').isLength({ min: 3 }),
    body('description', 'name must have a min. length of 10').isLength({ min: 10 }),
    body('category', 'category is empty').exists(),
    body('unitPrice', 'unitPrice is invalid').isFloat({ min: 0.0 })
  ],
  "id":[
    param('id','id must be a valid UUID').isUUID()
  ]
}

exports.validate = (validator) => {
  return validators[validator];
}

exports.createProduct = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Product.create(req.body)
         .then(product => res.json(product));
}

exports.updateProduct = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Product.update(req.body, {where : {id : req.params.id}, returning: true, plain: true})
         .then(result => {
            res.json(result[1]);
         });
}

exports.getProductByID = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Product.findByPk(req.params.id)
         .then(product => res.json(product));
}