const OrderItem = require('./model');

exports.createOrderItem = (req, res, next) => {
  try {

    OrderItem.findOne({ where: { id: req.body.id } }).then(orderItem => {
      if (orderItem) {
        res.status(422).json({ 'message': 'orderItem already exists with the same id' });
      } else {
        OrderItem.create(req.body).then(orderItem => res.json(orderItem));
      }
    });

  } catch (err) {
    return next(err);
  }
}

exports.updateOrderItem = (req, res, next) => {
  try {

    OrderItem.update(req.body, { where: { id: req.params.id }, returning: true, plain: true })
      .then(result => { res.json(result[1]); });

  } catch (err) {
    return next(err);
  }
}

exports.getOrderItemByID = (req, res, next) => {
  try {

    OrderItem.findByPk(req.params.id).then(orderItem => res.json(orderItem));

  } catch (err) {
    return next(err);
  }
}