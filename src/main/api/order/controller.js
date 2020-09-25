const Order = require('./model');
const OrderItem = require('../orderItem/model');

exports.createOrder = (req, res, next) => {
  try {

    Order.findOne({ where: { id: req.body.id } }).then(order => {
      if (order) {
        res.status(422).json({ 'message': 'order already exists with the same id' });
      } else {
        Order.create(req.body).then(order => res.json(order));
      }
    });

  } catch (err) {
    return next(err);
  }
}

exports.updateOrder = (req, res, next) => {
  try {

    Order.update(req.body, { where: { id: req.params.id }, returning: true, plain: true })
      .then(result => { res.json(result[1]); });

  } catch (err) {
    return next(err);
  }
}

exports.getOrderByID = (req, res, next) => {
  try {

    Order.findByPk(req.params.id).then(order => res.json(order));

  } catch (err) {
    return next(err);
  }
}

exports.getItemsByOrderId = (req, res, next) => {
  try {

    OrderItem.findAll({ where: { orderId: req.params.id } }).then(items => res.json(items));

  } catch (err) {
    return next(err);
  }
}