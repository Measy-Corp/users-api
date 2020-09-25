const router = require('express').Router();
const controller = require('./controller')
const auth = require('../auth/controller');

router.post('/store',
    auth.verify,
    controller.validate('post'),
    controller.createStore
);

router.patch('/store/:id',
    auth.verify,
    controller.validate('patch'),
    controller.updateStore
);

router.get('/store/:id',
    auth.verify,
    controller.validate('getById'),
    controller.getStoreByID
);

router.get('/store/name/:name',
    auth.verify,
    controller.validate('getByName'),
    controller.getStoresByName
);

router.get('/store/type/:type',
    auth.verify,
    controller.validate('getByType'),
    controller.getStoresByType
);

router.get('/store/:id/orders',
    auth.verify,
    controller.getOrdersByStoreId
);

module.exports = router;