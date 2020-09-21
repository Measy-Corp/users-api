const { body, param, check, validationResult } = require('express-validator');
const User = require('../../infrastructure/models/user');

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
    check('username').custom((value, { req }) => {
      return User.findOne({where : {username : value}}).then(user => {
        if (user) {
            return Promise.reject('username already in use');
        }
      })
    }),
    body('email', 'email is invalid').isEmail(),
    body('password', 'password must have a min. length of 5').isLength({ min: 5 }),
    body('phone').optional().isInt()
  ],
  "auth": [
    body('username', 'username must be set').exists(),
    body('password', 'password must be set').exists(),
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
  ],
  "username":[
    param('username','username must be set').exists(),
  ]
}

exports.validate = (validator) => {
  return validators[validator];
}

exports.createUser = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.create(req.body)
      .then(user => res.json(user));
}

exports.authUser = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.findOne({where : {username : req.body.username}})
      .then(user => {
        console.log(user.password + ' == ' + req.body.password + '?');
        res.json(user.password == req.body.password)
      });
}

exports.updateUser = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.update(req.body, {where : {id : req.params.id}, returning: true, plain: true})
      .then(result => {
        res.json(result[1]);
      });
}

exports.getUserByID = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.findByPk(req.params.id)
      .then(user => res.json(user));
}

exports.getUserByUsername = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.findOne({where : {username : req.params.username}})
      .then(user => res.json(user));
}