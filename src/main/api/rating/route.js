const router = require('express').Router();
const ratingController = require('./controller')

router.post('/rating',
    ratingController.validate('basic'),
    ratingController.createRating
);

router.get('/rating/:id',
    ratingController.validate('id'),
    ratingController.getRatingByID
);

router.get('/rating/store/:storeId',
    ratingController.validate('storeId'),
    ratingController.getRatingsByStoreId
);

router.patch('/rating/:id',
    ratingController.validate('patch'),
    ratingController.updateRatingById
);


module.exports = router;