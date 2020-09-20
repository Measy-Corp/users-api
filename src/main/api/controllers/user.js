const { body, validationResult } = require('express-validator');
const User = require('../../infrastructure/models/user')

const validators = {
  "basic": [
    body('id', 'id must be set').exists(),
    body('firstName', 'firstName must be set').exists(),
    body('username', 'username must be set').exists(),
    body('email', 'email is invalid').isEmail(),
    body('password', 'password must have a min. length of 5').isLength({ min: 5 }),
    body('phone').optional().isInt()
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