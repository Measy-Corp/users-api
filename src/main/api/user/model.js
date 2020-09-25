const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize.js')

class User extends Model {}

module.exports = User.init({

  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  lastName: {
    type: DataTypes.STRING
  },

  document: {
    type: DataTypes.STRING
  }

}, {
  sequelize: sequelize, 
  modelName: 'user',
  underscored: true,
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] },
    }
  }
});