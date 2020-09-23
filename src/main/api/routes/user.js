const router = require('express').Router();
const userController = require('../controllers/user')

router.post('/user', 
    userController.validate('basic'), 
    userController.createUser
);

router.post('/user/auth', 
    userController.validate('auth'), 
    userController.authUser
);

router.patch('/user/:id', 
    userController.validate('patch'), 
    userController.updateUser
);

router.get('/user/:id',
    userController.validate('id'), 
    userController.getUserByID
);

router.get('/user/username/:username',
    userController.validate('username'), 
    userController.getUserByUsername
);

module.exports = router;