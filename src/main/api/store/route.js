const router = require('express').Router();
const controller = require('./controller');
const validator = require('./validator');
const validationHandler = require('../utils/validationHandler');
const auth = require('../auth/controller');

router.post('/store',
    auth.verify,
    validator.getValidations('post'),
    validationHandler.handleValidations,
    controller.createStore
);

router.patch('/store/:id',
    auth.verify,
    validator.getValidations('patch'),
    validationHandler.handleValidations,
    controller.updateStore
);

router.get('/store/:id',
    auth.verify,
    validator.getValidations('idParam'),
    validationHandler.handleValidations,
    controller.getStoreByID
);

router.get('/store/name/:name',
    auth.verify,
    validator.getValidations('nameParam'),
    validationHandler.handleValidations,
    controller.getStoresByName
);

router.get('/store/type/:type',
    auth.verify,
    validator.getValidations('typeParam'),
    validationHandler.handleValidations,
    controller.getStoresByType
);

router.get('/store/:id/orders',
    auth.verify,
    validator.getValidations('idParam'),
    validationHandler.handleValidations,
    controller.getOrdersByStoreId
);

module.exports = router;