const router = require('express').Router();
const controller = require('./controller');
const validator = require('./validator');
const validationHandler = require('../utils/validationHandler');
const auth = require('../auth/controller');

router.post('/product', 
    auth.verify,
    validator.getValidations('post'),
    validationHandler.handleValidations,
    controller.createProduct
);

router.patch('/product/:id', 
    auth.verify,
    validator.getValidations('patch'),
    validationHandler.handleValidations,
    controller.updateProduct
);

router.get('/product/:id',
    auth.verify,
    validator.getValidations('idParam'),
    validationHandler.handleValidations,
    controller.getProductByID
);

module.exports = router;