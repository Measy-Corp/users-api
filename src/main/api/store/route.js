const router = require('express').Router();
const storeController = require('./controller')
const auth = require('../auth/controller');

router.post('/store',
    auth.verify,
    storeController.validate('post'),
    storeController.createStore
);

router.patch('/store/:id',
    auth.verify,
    storeController.validate('patch'),
    storeController.updateStore
);

router.get('/store/:id',
    auth.verify,
    storeController.validate('getById'),
    storeController.getStoreByID
);

router.get('/store/name/:name',
    auth.verify,
    storeController.validate('getByName'),
    storeController.getStoresByName
);

router.get('/store/type/:type',
    auth.verify,
    storeController.validate('getByType'),
    storeController.getStoresByType
);


module.exports = router;