const router = require('express').Router();
const productController = require('../controllers/product');
const auth = require('../auth/controller');

router.post('/product', 
    productController.validate('basic'),
    auth.verify,
    productController.createProduct
);

router.patch('/product/:id', 
    productController.validate('patch'),
    auth.verify,
    productController.updateProduct
);

router.get('/product/:id',
    productController.validate('id'),
    auth.verify,
    productController.getProductByID
);

module.exports = router;