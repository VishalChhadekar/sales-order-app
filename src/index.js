const sequelize = require('./config/database');
const Product = require('./models/product');
const SalesOrder = require('./models/salesOrder');

const db = {
    Sequelize: sequelize,
    Product,
    SalesOrder
};
// Sync database models and log success/error messages
sequelize.sync({ force: false })
    .then(() => console.log("Database & tables synced successfully"))
    .catch((error) => console.error("Error syncing database:", error));

module.exports = db;
