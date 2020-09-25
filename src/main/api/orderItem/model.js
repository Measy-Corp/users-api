const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelize.js')
const Product = require('../product/model');
const Order = require('../order/model');

class OrderItem extends Model {}

module.exports = OrderItem.init({

	id: {
		type: DataTypes.UUIDV4,
		primaryKey: true
	},

	orderId: {
		type: DataTypes.UUIDV4,
		allowNull: false,
		noUpdate : true
	},

	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false
	},

	productId: {
		type: DataTypes.UUIDV4,
		allowNull: false
	},

	unitPrice: {
		type: DataTypes.DECIMAL,
		allowNull: false
	}

}, {
  sequelize: sequelize, 
  modelName: 'order_item',
  underscored: true
});

OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);