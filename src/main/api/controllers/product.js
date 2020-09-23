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
    body('firstName', 'firstName must be set').optional().exists(),
    body('username', 'username must be set').exists(),
    body('email', 'email is invalid').isEmail(),
    body('phone').optional().isInt()
  ],
  "patch": [
    body('id','id must be a valid UUID').isUUID(),
    body('username', 'username is not writeable').isEmpty(),
    body('email', 'email is invalid').optional().isEmail(),
    body('password', 'password must have a min. length of 5').optional().isLength({ min: 5 }),
    body('phone').optional().isInt()
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