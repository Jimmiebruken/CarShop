var express = require('express');
var router = express.Router();
var da = require('../data_access/da');


/* GET product listing. */
router.get('/', function(req, res, next) {
  var admin = req.session['admin_is']
  var userid = req.session['userid'];
  da.getAll_products(function(err, items) {
    items.forEach(function (item, err) {
      res.render('products/products', {title:'Product listing','product_list': items, userid: userid, admin: admin})


    })

  })
});

router.post('/', function(req, res, next) {
  da.save_product(req.body, function(err) {
    res.redirect('/products');
  });
});

router.get('/add', function(req, res){
  var admin = req.session['admin_is']
  var userid = req.session['userid'];
  res.render('products/add', {title: 'Add Product', userid: userid, admin: admin});
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
