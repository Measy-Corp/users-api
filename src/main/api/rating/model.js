const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize.js');
require('sequelize-noupdate-attributes')(sequelize);

class Rating extends Model { }

module.exports = Rating.init({

    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true
    },

    storeId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        noUpdate : true
    },

    userId:{
        type: DataTypes.UUIDV4,
        allowNull: false,
        noUpdate : true
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