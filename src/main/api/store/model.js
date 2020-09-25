const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize.js')
const User = require('../user/model');

class Store extends Model {}

module.exports = Store.init({

  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING
  },

  document: {
    type: DataTypes.STRING
  },

  phone: {
    type: DataTypes.STRING
  },

  address: {
    type: DataTypes.STRING
  },

  email: {
    type: DataTypes.STRING
  },

  type: {
    type: DataTypes.STRING
  },

  ownerId: {
    type: DataTypes.UUIDV4
  },

}, {
  sequelize: sequelize, 
  modelName: 'store',
  underscored: true
});

Store.belongsTo(User, {foreignKey: 'ownerId', targetKey: 'id'});