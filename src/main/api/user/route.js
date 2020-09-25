const router = require('express').Router();
const controller = require('./controller');
const validator = require('./validator');
const validationHandler = require('../utils/validationHandler')
const auth = require('../auth/controller');

router.post('/user', 
    auth.verify,
    validator.getValidations('post'),    
    validationHandler.handleValidations,
    controller.createUser
);

router.patch('/user/:id',
    auth.verify,
    validator.getValidations('patch'), 
    validationHandler.handleValidations,
    controller.updateUser
);

router.get('/user/:id',
    auth.verify,
    validator.getValidations('idParam'), 
    validationHandler.handleValidations,
    controller.getUserByID
);

router.get('/user/username/:username',
    auth.verify,
    validator.getValidations('usernameParam'), 
    validationHandler.handleValidations,
    controller.getUserByUsername
);

router.get('/user/:id/orders',
    auth.verify,
    validator.getValidations('idParam'), 
    validationHandler.handleValidations,
    controller.getOrdersByUserId
);

module.exports = router;