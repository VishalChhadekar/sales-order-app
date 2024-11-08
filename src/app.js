const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const salesOrderRoutes = require('./routes/salesOrderRoutes');
const db = require('./index.js');
const redisClient = require('./config/redisClient'); // Redis connection
const errorHandler = require('./middleware/errorHandler');
const morgan = require('morgan');

const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:4200', // Replace this with frontend domain
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));


app.use(bodyParser.json());
app.use('/api', productRoutes);
app.use('/api', salesOrderRoutes);

// Error handling middleware
app.use(errorHandler);



app.use(morgan('combined')); // Logs requests in a combined format (method, status, response time, etc.)


app.listen(3000, () => console.log('Server running on port 3000'));
