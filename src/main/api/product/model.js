const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize.js')
const Store = require('../store/model');

class Product extends Model {}

module.exports = Product.init({

  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false
  },

  unitPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },

  imageUrl: {
    type: DataTypes.STRING
  },

  storeId: {
    type: DataTypes.UUIDV4
  }

}, {
  sequelize: sequelize, 
  modelName: 'product',
  underscored: true
});

Product.belongsTo(Store);