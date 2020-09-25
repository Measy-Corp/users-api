const router = require('express').Router();
const controller = require('./controller');
const validator = require('./validator');
const validationHandler = require('../utils/validationHandler');
const auth = require('../auth/controller');

router.post('/order', 
    auth.verify,
    validator.getValidations('post'),
    validationHandler.handleValidations,
    controller.createOrder
);

router.patch('/order/:id', 
    auth.verify,
    validator.getValidations('patch'),
    validationHandler.handleValidations,
    controller.updateOrder
);

router.get('/order/:id',
    auth.verify,
    validator.getValidations('idParam'),
    validationHandler.handleValidations,
    controller.getOrderByID
);

router.get('/order/:id/items',
    auth.verify,
    validator.getValidations('idParam'),
    validationHandler.handleValidations,
    controller.getItemsByOrderId
);

module.exports = router;