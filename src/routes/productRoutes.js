const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.post('/internal/products', createProduct);
router.post('/external/products', createProduct);
router.get('/internal/products', getAllProducts);
router.get('/internal/products/:productId', getProductById);
router.put('/internal/products/:productId', updateProduct);
router.delete('/internal/products/:productId', deleteProduct);

module.exports = router;

