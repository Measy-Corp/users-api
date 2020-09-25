const { body, param, check, validationResult } = require('express-validator');
const Rating = require('../../infrastructure/models/rating');


const validators = {
    "basic": [
        body('id', 'id must be a valid UUID').isUUID(),
        check('id').custom((value, { req }) => {
            return Rating.findByPk(value).then(rate => {
                if (rate) {
                    return Promise.reject('id already exists');
                }
            })
        }),
        body('storeId', 'storeId must be a valid UUID').isUUID(),
        body('userId', 'userId must be a valid UUID').isUUID(),
        body('score', 'score must be set between 1.0 and 5.0').isFloat({ min: 1.0, max: 5.0 })
    ],
    "patch": [
        param('id', 'id must be a valid UUID').isUUID(),
        body('storeId', 'can not change storeId').isEmpty(),
        body('userId', 'can not change userId').isEmpty(),
        body('score', 'score must be set between 1.0 and 5.0').isFloat({ min: 1.0, max: 5.0 })
    ],
    "id": [
        param('id', 'id must be a valid UUID').isUUID()
    ],
    "storeId": [
        param('storeId', 'storeId must be set').exists()
    ]
}

exports.validate = (validator) => {
    return validators[validator];
}

exports.createRating = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Rating.create(req.body)
        .then(rate => res.json(rate));
}

exports.getRatingByID = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Rating.findByPk(req.params.id)
        .then(rate => res.json(rate));
}

exports.getRatingsByStoreId = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Rating.findAll({ where: { storeId: req.params.storeId } })
        .then(rates => res.json(rates));
}

exports.updateRatingById = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    Rating.update(req.body, {where : {id : req.params.id}, returning: true, plain: true})
        .then(result => {
          res.json(result[1]);
        });
  }