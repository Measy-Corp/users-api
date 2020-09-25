const router = require('express').Router();
const controller = require('./controller');
const auth = require('../auth/controller');

router.post('/rating',
    auth.verify,
    controller.validate('basic'),
    controller.createRating
);

router.get('/rating/:id',
    auth.verify,
    controller.validate('id'),
    controller.getRatingByID
);

router.get('/rating/store/:storeId',
    auth.verify,
    controller.validate('storeId'),
    controller.getRatingsByStoreId
);

router.patch('/rating/:id',
    auth.verify,
    controller.validate('patch'),
    controller.updateRatingById
);


module.exports = router;