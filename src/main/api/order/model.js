const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize.js');
const User = require('../user/model');
const Store = require('../store/model');
require('sequelize-noupdate-attributes')(sequelize);

class Order extends Model {}

module.exports = Order.init({

	id: {
		type: DataTypes.UUIDV4,
		primaryKey: true
	},

	userId: {
		type: DataTypes.UUIDV4,
		noUpdate : true
	},

	storeId: {
		type: DataTypes.UUIDV4,
		noUpdate : true
	},

	status: {
		type: DataTypes.STRING,
		defaultValue: 'New'
	},

	totalPrice: {
		type: DataTypes.DECIMAL
	},

	description: {
		type: DataTypes.STRING
	}

}, {
  sequelize: sequelize, 
  modelName: 'order',
  underscored: true
});

Order.belongsTo(User);
Order.belongsTo(Store);