const router = require('express').Router();
const authController = require('./controller');

router.post('/login', 
	authController.validate('login'),
	authController.login
);

module.exports = router;