const router = require('express').Router();
const controller = require('./controller');
const auth = require('../auth/controller');

router.post('/orderitem', 
    auth.verify,
    controller.validate('post'),
    controller.createOrderItem
);

router.patch('/orderitem/:id', 
    auth.verify,
    controller.validate('patch'),
    controller.updateOrderItem
);

router.get('/orderitem/:id',
    auth.verify,
    controller.getOrderItemByID
);

module.exports = router;