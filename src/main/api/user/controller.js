const { Op } = require("sequelize");
const User = require('./model');
const Order = require('../order/model');

exports.createUser = (req, res, next) => {
  try {

  User.findOne({ where: {[Op.or]: [{ id: req.body.id }, { username: req.body.username }]}})
    .then(user => { 
      if (user) {
        res.status(422).json({'message': 'user already exists with the same id or username'}); 
      } else {
        User.create(req.body).then(user => res.json(user));
      }
  })

  } catch (err) {
    return next(err);
  } 
}

exports.updateUser = (req, res, next) => {
  try {

    User.update(req.body, { where: { id: req.params.id }, returning: true, plain: true})
      .then(result => res.json(result[1]));

  } catch (err) {
    return next(err);
  }
}

exports.getUserByID = (req, res, next) => {
  try {

    User.findByPk(req.params.id).then(user => res.json(user));

  } catch (err) {
    return next(err);
  }
}

exports.getUserByUsername = (req, res, next) => {
  try {

    User.findOne({ where: { username: req.params.username }}).then(user => res.json(user));

  } catch (err) {
    return next(err);
  }
}

exports.getOrdersByUserId = (req, res, next) => {
  try {

    Order.findAll({ where: { userId: req.params.id }}).then(orders => res.json(orders));

  } catch (err) {
    return next(err);
  }
}