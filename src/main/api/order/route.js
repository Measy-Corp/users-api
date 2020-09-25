const router = require('express').Router();
const controller = require('./controller');
const auth = require('../auth/controller');

router.post('/order', 
    auth.verify,
    controller.validate('post'),
    controller.createOrder
);

router.patch('/order/:id', 
    auth.verify,
    controller.validate('patch'),
    controller.updateOrder
);

router.get('/order/:id',
    auth.verify,
    controller.getOrderByID
);

router.get('/order/:id/items',
    auth.verify,
    controller.getItemsByOrderId
);

module.exports = router;