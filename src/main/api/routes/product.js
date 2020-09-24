const router = require('express').Router();
const productController = require('../controllers/product')

router.post('/product', 
    productController.validate('basic'), 
    productController.createProduct
);

router.patch('/product/:id', 
    productController.validate('patch'), 
    productController.updateProduct
);

router.get('/product/:id',
    productController.validate('id'), 
    productController.getProductByID
);

module.exports = router;