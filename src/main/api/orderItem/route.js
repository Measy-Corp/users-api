const router = require('express').Router();
const controller = require('./controller');
const validator = require('./validator');
const validationHandler = require('../utils/validationHandler');
const auth = require('../auth/controller');

router.post('/orderitem', 
    auth.verify,
    validator.getValidations('post'),
    validationHandler.handleValidations,
    controller.createOrderItem
);

router.patch('/orderitem/:id', 
    auth.verify,
    validator.getValidations('patch'),
    validationHandler.handleValidations,
    controller.updateOrderItem
);

router.get('/orderitem/:id',
    auth.verify,
    validator.getValidations('idParam'),
    validationHandler.handleValidations,
    controller.getOrderItemByID
);

module.exports = router;