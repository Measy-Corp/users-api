const { body, param, check, validationResult } = require('express-validator');
const Store = require('../../infrastructure/models/store');
const { Op } = require('sequelize');

const validators = {
  "post": [
    body('id','id must be a valid UUID').isUUID(),
    check('id').custom((value, { req }) => {
      return Store.findByPk(value).then(store => {
        if (store) {
            return Promise.reject('id already exists');
        }
      })
    }),
    body('ownerId', 'ownerId must be a valid UUID').isUUID(),
    body('document', 'document must be set').exists(),
    body('name', 'name must have a min. length of 3').isLength({ min: 3 }),
    body('phone', 'name must be set').exists(),
    body('address', 'category must be set').exists(),
    body('email', 'email is invalid').isEmail(),
    body('type', 'type must be set').exists(),
  ],
  "patch": [
    body('ownerId', 'ownerId must be a valid UUID').optional().isUUID(),
    body('document', 'document must be set').optional().exists(),
    body('name', 'name must have a min. length of 3').optional().isLength({ min: 3 }),
    body('phone', 'name must be set').optional().exists(),
    body('address', 'category must be set').optional().exists(),
    body('email', 'email is invalid').optional().isEmail(),
    body('type', 'type must be set').optional().exists(),
  ],
  "getById": [
    param('id', 'id must be a valid UUID').isUUID()
  ],
  "getByName": [
    param('name', 'name must have a length of at least 4').isLength({ min: 4 })
  ],
  "getByType": [
    param('type', 'type must be set').exists()
  ]
}

exports.validate = (validator) => {
  return validators[validator];
}

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