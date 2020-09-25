const router = require('express').Router();
const userController = require('./controller')
const auth = require('../auth/controller');

router.post('/user', 
    userController.validate('basic'),    
    userController.createUser
);

router.patch('/user/:id',
    auth.verify,
    userController.validate('patch'), 
    userController.updateUser
);

router.get('/user/:id',
    auth.verify,
    userController.validate('id'), 
    userController.getUserByID
);

router.get('/user/username/:username',
    auth.verify,
    userController.validate('username'), 
    userController.getUserByUsername
);

module.exports = router;