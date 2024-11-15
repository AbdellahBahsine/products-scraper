const mongoose = require('../db');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    url: String,
    image: String,
    delivery: String,
    price: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;