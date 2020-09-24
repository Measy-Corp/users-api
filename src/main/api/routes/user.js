const router = require('express').Router();
const userController = require('../controllers/user')
const auth = require('../auth/controller');

router.post('/user', 
    auth.verify,
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