const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create product Schema
const productSchema = new Schema({
    product_name: String,
    price_buy: Number,
    price_sell: Number,
    stock: {
        amount: Number,
        location: String
    },

}, { collection: 'product' });

// Create model
const product = mongoose.model('product', productSchema);

module.exports = product;