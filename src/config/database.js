const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,  // Adjust based on Supabase SSL needs
        },
    },
    logging: (msg) => console.log("Sequelize:", msg),  // Enhanced logging for debugging
});

// Confirm database connection with better logging
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
    }
})();

module.exports = sequelize;
