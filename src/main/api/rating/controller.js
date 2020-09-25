const Rating = require('./model');

exports.createRating = (req, res, next) => {
  try {

    Rating.findOne({ where: { id: req.body.id }}).then(rating => {
      if (rating) {
        res.status(422).json({'message': 'rating already exists with the same id'}); 
      } else {
        Rating.create(req.body).then(rate => res.json(rate));
      }
    });

  } catch (err) {
    return next(err);
  }
}

exports.getRatingByID = (req, res, next) => {
  try {

    Rating.findByPk(req.params.id).then(rate => res.json(rate));

  } catch (err) {
    return next(err);
  }
}

exports.getRatingsByStoreId = (req, res, next) => {
  try {

    Rating.findAll({ where: { storeId: req.params.storeId } }).then(rates => res.json(rates));

  } catch (err) {
    return next(err);
  }
}

exports.updateRatingById = (req, res, next) => {
  try {

    Rating.update(req.body, { where: { id: req.params.id }, returning: true, plain: true })
      .then(result => { res.json(result[1]); });

  } catch (err) {
    return next(err);
  }
}