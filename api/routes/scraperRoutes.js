const express = require('express');
const router = express.Router();

const { scrapeAmazon } = require('../controllers/scraperController');

const Product = require('../models/productModel');

router.get('/scrape', async (req, res) => {
    await scrapeAmazon();

    res.json({});
});
router.get('/products/:category', async (req, res) => {
    const { category } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find({ category }).skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments({ category });
        const hasMore = skip + limit < totalProducts;

        res.json({ products, currentPage: page, hasMore });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;