const express = require('express');
const {
    createSalesOrder,
    getAllSalesOrders,
    getSalesOrderById,
    updateSalesOrder,
    deleteSalesOrder
} = require('../controllers/salesOrderController');

const router = express.Router();

router.post('/sales-orders', createSalesOrder);
router.get('/sales-orders', getAllSalesOrders);
router.get('/sales-orders/:orderId', getSalesOrderById);
router.put('/sales-orders/:orderId', updateSalesOrder);
router.delete('/sales-orders/:orderId', deleteSalesOrder);

module.exports = router;
