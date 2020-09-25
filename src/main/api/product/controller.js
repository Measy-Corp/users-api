const Product = require('./model');

exports.createProduct = (req, res, next) => {
  try {

    Product.findOne({ where: { id: req.body.id }}).then(product => {
      if (product) {
        res.status(422).json({'message': 'product already exists with the same id'}); 
      } else {
        Product.create(req.body).then(product => res.json(product));
      }
    });

  } catch (err) {
    return next(err);
  }
}

exports.updateProduct = (req, res, next) => {
  try {

    Product.update(req.body, { where: { id: req.params.id }, returning: true, plain: true })
      .then(result => { res.json(result[1]); });
  
  } catch (err) {
    return next(err);
  }
}

exports.getProductByID = (req, res, next) => {
  try {

    Product.findByPk(req.params.id).then(product => res.json(product));

  } catch (err) {
    return next(err);
  }
}