const { body, param, check, validationResult } = require('express-validator');
const User = require('../user/model');
const jwt = require('jsonwebtoken');

const validators = {
  "login": [
    body('username', 'username must be set').exists(),
    body('password', 'password must be set').exists()
  ]
}

exports.validate = (validator) => {
  return validators[validator];
}

exports.login = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.scope('withPassword').findOne({where: { username: req.body.username}})
    .then(user => {
      let id = user.id;

      if (user.password == req.body.password) {
        let token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 86400 });
        return res.json({ auth: true, token: token });
      }

      return res.status(403).json({ auth: false, message: 'Invalid credentials' })
    });
}

exports.verify = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if (!token) return res.status(403).json({ auth: false, message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ auth: false, message: 'Unauthorized' });
    req.userId = decoded.id;
    next();
  });
}