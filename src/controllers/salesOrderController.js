const SalesOrder = require('../models/salesOrder');
const Product = require('../models/product');
const axios = require('axios');

// Create a Sales Order with Product IDs
exports.createSalesOrder = async (req, res) => {
    try {
        const { customer_name, email, mobile_number, status, product_ids } = req.body;

        // Create the SalesOrder
        const order = await SalesOrder.create({ customer_name, email, mobile_number, status });

        // Retrieve Products based on the provided IDs
        const products = await Product.findAll({
            where: {
                product_id: product_ids
            }
        });

        // Associate products with the SalesOrder
        await Promise.all(
            products.map(product =>
                product.update({ sales_order_id: order.order_id })
            )
        );

        // Send order details to the third-party API
        const response = await axios.post('https://third-party-api.com/salesOrder', {
            ...order.toJSON(),
            products: products.map(product => product.toJSON())
        }, {
            headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' }
        });

        res.status(201).json({ order, products, thirdPartyResponse: response.data });
    } catch (error) {
        res.status(500).json({ message: 'Error creating sales order', error });
    }
};

// Get All Sales Orders
exports.getAllSalesOrders = async (req, res) => {
    try {
        const salesOrders = await SalesOrder.findAll({
            include: Product  // Include associated products
        });
        res.status(200).json(salesOrders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales orders', error });
    }
};

// Get a Sales Order by ID
exports.getSalesOrderById = async (req, res) => {
    try {
        const order = await SalesOrder.findByPk(req.params.orderId, {
            include: Product  // Include associated products
        });
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Sales order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales order', error });
    }
};

// Update a Sales Order by ID
exports.updateSalesOrder = async (req, res) => {
    try {
        const { customer_name, email, mobile_number, status, product_ids } = req.body;

        // Find the SalesOrder
        const order = await SalesOrder.findByPk(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Sales order not found' });
        }

        // Update SalesOrder details
        order.customer_name = customer_name || order.customer_name;
        order.email = email || order.email;
        order.mobile_number = mobile_number || order.mobile_number;
        order.status = status || order.status;
        await order.save();

        // Update associated products if new product IDs are provided
        if (product_ids && product_ids.length > 0) {
            // Dissociate existing products from this order
            await Product.update({ sales_order_id: null }, { where: { sales_order_id: order.order_id } });

            // Associate new products with this SalesOrder
            const products = await Product.findAll({ where: { product_id: product_ids } });
            await Promise.all(
                products.map(product =>
                    product.update({ sales_order_id: order.order_id })
                )
            );
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating sales order', error });
    }
};

// Delete a Sales Order by ID
exports.deleteSalesOrder = async (req, res) => {
    try {
        const order = await SalesOrder.findByPk(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Sales order not found' });
        }

        // Dissociate products from this order before deletion
        await Product.update({ sales_order_id: null }, { where: { sales_order_id: order.order_id } });

        // Delete the SalesOrder
        await order.destroy();
        res.status(200).json({ message: 'Sales order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting sales order', error });
    }
};
