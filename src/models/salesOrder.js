const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');

const SalesOrder = sequelize.define('SalesOrder', {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customer_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    mobile_number: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    order_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
    timestamps: false,
    tableName: 'SalesOrders'  // Explicit table name if needed
});

SalesOrder.hasMany(Product, { foreignKey: 'sales_order_id' });
Product.belongsTo(SalesOrder, { foreignKey: 'sales_order_id' });

module.exports = SalesOrder;
