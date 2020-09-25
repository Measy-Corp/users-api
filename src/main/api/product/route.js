const router = require('express').Router();
const controller = require('./controller');
const auth = require('../auth/controller');

router.post('/product', 
    auth.verify,
    controller.validate('post'),
    controller.createProduct
);

router.patch('/product/:id', 
    auth.verify,
    controller.validate('patch'),
    controller.updateProduct
);

router.get('/product/:id',
    auth.verify,
    controller.getProductByID
);

module.exports = router;