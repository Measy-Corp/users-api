const { body, param, check, validationResult } = require('express-validator');
const product = require('../../infrastructure/models/product');
const Product = require('../../infrastructure/models/product');

const validators = {
  "basic": [
    body('id','id must be a valid UUID').isUUID(),
    check('id').custom((value, { req }) => {
      return User.findByPk(value).then(user => {
        if (user) {
            return Promise.reject('id already exists');
        }
      })
    }),
    body('name', 'name is empty').isEmpty(),
    body('category', 'category is empty').isEmpty(),
    body('unitPrice', 'unitPrice is invalid').isDecimal(),

  ],
  "patch": [
    body('id','id must be a valid UUID').isUUID(),
  //  body('name', 'username is not writeable').isEmpty(),
  //  body('category', 'email is invalid').optional().isEmail(),
  //  body('unitPrice', 'unitPrice must be greater than 0').isLength({ min: 5 }), 
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

exports.getProductByName = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Product.findByName(req.params.name)
         .then(product => res.json(product));
}

exports.getProductByCategory = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Product.findByUnitPrice(req.params.Category)
         .then(product => res.json(product));
}

exports.getProductByUnitPrice = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Product.findByUnitPrice(req.params.UnitPrice)
         .then(product => res.json(product));
}