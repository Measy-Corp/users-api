const router = require('express').Router();
const controller = require('./controller');

router.post('/login', 
	controller.validate('login'),
	controller.login
);

module.exports = router;