const router = require('express').Router();
const storeController = require('../controllers/store')

router.post('/store',
    storeController.createStore
);

router.patch('/store',
    storeController.updateStore
);

router.get('/store/:id',
    storeController.getStoreByID
);

router.get('/store/name/:name',
    storeController.getStoresByName
);

router.get('/store/type/:type',
    storeController.getStoresByType
);


module.exports = router;