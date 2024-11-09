const Product = require('../models/product');
const redisClient = require('../config/redisClient');  // Import Redis client

// Create a Product
exports.createProduct = async (req, res) => {
    try {
        const { product_name, price, image_url } = req.body;
        const product = await Product.create({ product_name, price, image_url });

        // Clear the cache for all products list so that it fetches updated data on the next request
        await redisClient.del('allProducts');

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        // Check if products are cached
        const cachedProducts = await redisClient.get('allProducts');
        if (cachedProducts) {
            console.log("Redis: Products from cache")
            return res.status(200).json(JSON.parse(cachedProducts));
        }

        // Fetch products from database if not in cache
        const products = await Product.findAll();
        await redisClient.setEx('allProducts', 600, JSON.stringify(products)); // Cache for 10 minutes

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};


// Get a Product by ID
exports.getProductById = async (req, res) => {
    const { productId } = req.params;

    try {
        // Check if the product is cached
        const cachedProduct = await redisClient.get(`product:${productId}`);
        if (cachedProduct) {
            return res.status(200).json(JSON.parse(cachedProduct));
        }

        // Fetch product from database if not in cache
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await redisClient.setEx(`product:${productId}`, 600, JSON.stringify(product)); // Cache for 10 minutes

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};


// Update a Product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { product_name, price, image_url } = req.body;  // Include image_url if it can be updated
        const product = await Product.findByPk(req.params.productId);

        if (product) {
            product.product_name = product_name || product.product_name;
            product.price = price || product.price;
            product.image_url = image_url || product.image_url;  // Update image_url if provided

            await product.save();

            // Clear cache for the updated product and the allProducts list
            await redisClient.del(`product:${req.params.productId}`);
            await redisClient.del('allProducts');

            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete a Product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId);

        if (product) {
            await product.destroy();

            // Clear cache for the deleted product and the allProducts list
            await redisClient.del(`product:${req.params.productId}`);
            await redisClient.del('allProducts');

            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
