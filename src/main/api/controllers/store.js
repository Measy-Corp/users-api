const { body, param, check, validationResult } = require('express-validator');
const Store = require('../../infrastructure/models/store');
const { Op } = require('sequelize');

exports.createStore = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Store.create(req.body)
      .then(user => res.json(user));
}

exports.updateStore = (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Store.update(req.body, {where : {id : req.params.id}, returning: true, plain: true})
    .then(result => {
      res.json(result[1]);
    });
}

exports.getStoreByID = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Store.findByPk(req.params.id)
       .then(user => res.json(user));
}

exports.getStoresByName = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Store.findAll({where : {name : {[Op.iLike] : req.params.name + '%'}}})
      .then(stores => res.json(stores));
}

exports.getStoresByType = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Store.findAll({where : {type : req.params.type}})
       .then(stores => res.json(stores));
}