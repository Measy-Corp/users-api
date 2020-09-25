const { body, param, check, validationResult } = require('express-validator');
const OrderItem = require('./model');

const validators = {
  "post": [
    body('id','id must be a valid UUID').isUUID(),
    check('id').custom((value, { req }) => {
      return OrderItem.findByPk(value).then(orderItem => {
        if (orderItem) {
            return Promise.reject('id already exists');
        }
      })
    }),
    body('orderId','orderId must be a valid UUID').isUUID(),
    body('productId','userId must be a valid UUID').isUUID(),
    body('quantity', 'status is empty').isInt(),
    body('unitPrice', 'unitPrice is invalid').isFloat({ min: 0.0 })
  ],
  "patch": [
		body('id','id must be a valid UUID').isUUID(),
    body('orderId','orderId must be a valid UUID').optional().isUUID(),
    body('productId','userId must be a valid UUID').optional().isUUID(),
    body('quantity', 'status is empty').optional().isInt(),
    body('unitPrice', 'unitPrice is invalid').optional().isFloat({ min: 0.0 })
  ]
}

exports.validate = (validator) => {
  return validators[validator];
}

exports.createOrderItem = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  OrderItem.create(req.body)
      		 .then(orderItem => res.json(orderItem));
}

exports.updateOrderItem = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  OrderItem.update(req.body, {where : {id : req.params.id}, returning: true, plain: true})
					 .then(result => {
					 		res.json(result[1]);
					 });
}

exports.getOrderItemByID = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  OrderItem.findByPk(req.params.id)
       		 .then(orderItem => res.json(orderItem));
}