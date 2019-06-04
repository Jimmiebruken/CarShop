var express = require('express');
var router = express.Router();
var da = require('../data_access/da');


/* GET product listing. */
router.get('/', function(req, res, next) {
  da.getAll_products(function(err, items) {
    items.forEach(function (item, err) {
      res.render('products/products', {title:'Product listing','product_list': items})


    })

  })
});

router.post('/', function(req, res, next) {
  da.save_product(req.body, function(err) {
    res.redirect('/products');
  });
});

router.get('/add', function(req, res){
  res.render('products/add', {title: 'Add Product'});
});

router.get('/delete', function(req, res){
  da.delete_product(req.query.id, function(err){
    res.redirect('/products');
  });
});

/*
router.get('/add_friend', function(req, res){
  da.addFriend(req.session['userid'], req.query.id, function(err){
    res.redirect('/users');
  });
});
*/
module.exports = router;
