const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create customer Schema
const CustomerSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String,
    birthyear: Number,
}, { collection: 'customer' });

// Create model
const customer = mongoose.model('customer', CustomerSchema);

module.exports = customer;