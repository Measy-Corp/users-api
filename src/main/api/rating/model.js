const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize.js')

class Rating extends Model { }

module.exports = Rating.init({

    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true
    },

    storeId: {
        type: DataTypes.UUIDV4,
        allowNull: false
    },

    userId:{
        type: DataTypes.UUIDV4,
        allowNull: false
    },

    score: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    }

}, {
    sequelize: sequelize, 
    modelName: 'rating',
    underscored: true
  });