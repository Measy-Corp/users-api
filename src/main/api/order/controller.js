const { body, param, check, validationResult } = require('express-validator');
const Order = require('./model');
const OrderItem = require('../orderItem/model');

const validators = {
  "post": [
    body('id','id must be a valid UUID').isUUID(),
    check('id').custom((value, { req }) => {
      return Order.findByPk(value).then(order => {
        if (order) {
            return Promise.reject('id already exists');
        }
      })
    }),
		body('storeId','storeId must be a valid UUID').isUUID(),
		body('userId','userId must be a valid UUID').isUUID(),
    body('status', 'status is empty').exists(),
    body('totalPrice', 'unitPrice is invalid').isFloat({ min: 0.0 })
  ],
  "patch": [
		body('id','id must be a valid UUID').isUUID(),
		body('storeId','storeId must be a valid UUID').optional().isUUID(),
		body('userId','userId must be a valid UUID').optional().isUUID(),
    body('totalPrice', 'totalPrice is invalid').optional().isFloat({ min: 0.0 })
  ]
}

exports.validate = (validator) => {
  return validators[validator];
}

exports.createOrder = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Order.create(req.body)
       .then(order => res.json(order));
}

exports.updateOrder = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Order.update(req.body, {where : {id : req.params.id}, returning: true, plain: true})
			 .then(result => { res.json(result[1]); });
}

exports.getOrderByID = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Order.findByPk(req.params.id)
       .then(order => res.json(order));
}

exports.getItemsByOrderId = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  OrderItem.findAll({where : {orderId : req.params.id}})
					 .then(items => res.json(items));
}