const Store = require('./model');
const Order = require('../order/model');
const { Op } = require('sequelize');

exports.createStore = (req, res, next) => {
  try {

    Store.findOne({ where: { id: req.body.id }}).then(store => {
      if (store) {
        res.status(422).json({'message': 'store already exists with the same id'}); 
      } else {
        Store.create(req.body).then(user => res.json(user));
      }
    });

  } catch (err) {
    return next(err);
  }
}

exports.updateStore = (req, res, next) => {
  try {

  Store.update(req.body, { where: { id: req.params.id }, returning: true, plain: true})
    .then(result => { res.json(result[1]); });

  } catch (err) {
    return next(err);
  }
}

exports.getStoreByID = (req, res, next) => {
  try {

    Store.findByPk(req.params.id).then(user => res.json(user));

  } catch (err) {
    return next(err);
  }
}

exports.getStoresByName = (req, res, next) => {
  try {

  Store.findAll({ where: { name: { [Op.iLike]: req.params.name + '%' }}})
    .then(stores => res.json(stores));

  } catch (err) {
    return next(err);
  }
}

exports.getStoresByType = (req, res, next) => {
  try {

    Store.findAll({ where: { type: req.params.type }}).then(stores => res.json(stores));

  } catch (err) {
    return next(err);
  }
}

exports.getOrdersByStoreId = (req, res, next) => {
  try {

    Order.findAll({ where: { storeId: req.params.id }}).then(orders => res.json(orders));

  } catch (err) {
    return next(err);
  }
}