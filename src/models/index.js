const sequelize = require('../config/database');
const Product = require('./product');
const SalesOrder = require('./salesOrder');

const db = {
    Sequelize: sequelize,
    Product,
    SalesOrder
};
// Sync database models and log success/error messages
sequelize.sync({ force: true })
    .then(() => console.log("Database & tables synced successfully"))
    .catch((error) => console.error("Error syncing database:", error));

module.exports = db;
