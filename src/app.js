const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const salesOrderRoutes = require('./routes/salesOrderRoutes');
const db = require('./models/index.js'); 

const app = express();

app.use(bodyParser.json());
app.use('/api', productRoutes);
app.use('/api', salesOrderRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
