const router = require('express').Router();
const controller = require('./controller')
const auth = require('../auth/controller');

router.post('/user', 
    controller.validate('basic'),    
    controller.createUser
);

router.patch('/user/:id',
    auth.verify,
    controller.validate('patch'), 
    controller.updateUser
);

router.get('/user/:id',
    auth.verify,
    controller.validate('id'), 
    controller.getUserByID
);

router.get('/user/username/:username',
    auth.verify,
    controller.validate('username'), 
    controller.getUserByUsername
);

router.get('/user/:id/orders',
    auth.verify,
    controller.validate('id'), 
    controller.getOrdersByUserId
);

module.exports = router;