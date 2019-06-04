const Customer = require('../models/customer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('../models/product');


function connect2db() {
    mongoose.connect('mongodb://localhost:27017/social_network',
        { useNewUrlParser: true });

    mongoose.connection.once('open', function () {
        console.log("Connection to MongoDB made...");
    }).on('error', function (error) {
        console.log("Error connecting to MongoDB. Error:", error);
    });
}

// customer functions
function saveCustomer(p, cb) {
    connect2db();
    var p1 = new Customer(p);
    bcrypt.hash(p1.password, 10, function(err, hash){
        p1.password = hash;
        p1.save(function(err){
            if(err) {
                console.log("Error creating user" + err)
            }
            cb(err);
        });
    });
}


function search(pattern, cb) {
    connect2db();
    Customer.find({$or: [
                        {first_name: {$regex: pattern }},
                        {last_name:{$regex: pattern }}
                      ]
    }, function(err, users){
        cb(err, users);
    });
}

function deleteUser(id, cb) {
    connect2db();
    Customer.deleteOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting user" + err);
       }
       cb(err);
    });
}

function admin_toggle(id, cb) {
    connect2db();
    Customer.findOneAndUpdate({"_id": id},{$set: {admin_is: true}}, function (err, res) {
        if(err) {
            console.log("Error admin" + err);
        }

        cb(err);
    });
}

function admin_toggle_off(id, cb) {
    connect2db();
    Customer.findOneAndUpdate({"_id": id},{$set: {admin_is: false}}, function (err, res) {
        if(err) {
            console.log("Error admin" + err);
        }

        cb(err);
    });
}
function getAllCustomers(cb) {
    connect2db();
    Customer.find(function(err, users) {
        if(err) {
            console.log('Error getting users' + err);
        }
        cb(err, users);
    });
}

// product functions
function save_product(p, cb) {
    connect2db();
    var p1 = new Product(p);

    p1.save(function(err){
        if(err) {
            console.log("Error creating product" + err)
        }
        cb(err);

    });
}


function search_product(pattern, cb) {
    connect2db();
    Product.find({$or: [
            {product_name: {$regex: pattern }},

        ]
    }, function(err, product){
        cb(err, product);
    });
}

function delete_product(id, cb) {
    connect2db();
    Product.deleteOne({"_id": id}, function (err, res) {
        if(err) {
            console.log("Error deleting user" + err);
        }
        cb(err);
    });
}

function getAll_products(cb) {
    connect2db();
    Product.find(function(err, product) {
        if(err) {
            console.log('Error getting products' + err);
        }
        cb(err, product);
    });
}
function getProdById(prod_id, cb) {
    connect2db();
    Product.findOne({'_id': prod_id}, function(err, product){
        cb(err, product);
    });
}


/*
function getFriendsOfUser(user, cb) {
    connect2db();
    var friends_ids = user.friends;
    if(friends_ids.length === 0) {
        cb([]);
    }
    var friends = [];
    var count = 0;
    friends_ids.forEach(function(id){
        Customer.findOne({'_id': id}, function(err, friend){
            friends.push(friend);
            count++;
            if(count === friends_ids.length){
                cb(friends);
            }
        });
    });
}
*/
function getCustomerByUsername(username, cb) {
    connect2db();
    Customer.findOne({'username': username}, function(err, user){
        cb(err, user);
    });
}
/*
function addFriend(userid1, userid2, cb) {
    connect2db();
    Customer.findOneAndUpdate({'_id': userid1}, {$push: {'friends': userid2}}, upsert=false, function(err){
        Customer.findOneAndUpdate({'_id': userid2}, {$push: {'friends': userid1}}, upsert=false, function(err){
            cb(err);
        });
    });
}

*/
function getCustomerById(userid, cb) {
    connect2db();
    Customer.findOne({'_id': userid}, function(err, user){
        cb(err, user);
    });
}




module.exports = {
    saveCustomerFromForm: saveCustomer,
    findCustomers: getAllCustomers,
    search: search,
    deleteUser: deleteUser,
    getUserByUsername: getCustomerByUsername,
    getUserById: getCustomerById,
    save_product: save_product,
    search_product: search_product,
    delete_product: delete_product,
    getAll_products: getAll_products,
    getProdById: getProdById,
    admin_toggle: admin_toggle,
    admin_toggle_off: admin_toggle_off
    //addFriend: addFriend,
    //getFriendsOfUser: getFriendsOfUser,
};