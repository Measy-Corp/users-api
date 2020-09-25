const router = require('express').Router();
const controller = require('./controller');
const validator = require('./validator');
const validationHandler = require('../utils/validationHandler');
const auth = require('../auth/controller');

router.post('/rating',
    auth.verify,
    validator.getValidations('post'),
    validationHandler.handleValidations,
    controller.createRating
);

router.get('/rating/:id',
    auth.verify,
    validator.getValidations('idParam'),
    validationHandler.handleValidations,
    controller.getRatingByID
);

router.get('/rating/store/:storeId',
    auth.verify,
    validator.getValidations('storeIdParam'),
    validationHandler.handleValidations,
    controller.getRatingsByStoreId
);

router.patch('/rating/:id',
    auth.verify,
    validator.getValidations('patch'),
    validationHandler.handleValidations,
    controller.updateRatingById
);


module.exports = router;