const router = require('express').Router();
const storeController = require('./controller')
const auth = require('../auth/controller');

router.post('/store',
    auth.verify,
    storeController.createStore
);

router.patch('/store:id',
    auth.verify,
    storeController.updateStore
);

router.get('/store/:id',
    auth.verify,
    storeController.getStoreByID
);

router.get('/store/name/:name',
    auth.verify,
    storeController.getStoresByName
);

router.get('/store/type/:type',
    auth.verify,
    storeController.getStoresByType
);


module.exports = router;