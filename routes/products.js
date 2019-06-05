var express = require('express');
var router = express.Router();
var da = require('../data_access/da');


/* GET product listing. */
router.get('/', function(req, res, next) {
  // saves is_admin to variable to send in resolution render
  var admin = req.session['admin_is'];
  // saves userid to variable to send in resolution render
  var userid = req.session['userid'];

  da.getAll_products(function(err, items) {
    // checks if admin == true
    console.log(admin);
    //checks item length
    console.log(items.length);
    // loop to mark items with "item" tag for further use in products.jade
    items.forEach(function (item, err) {
      console.log(item);
      res.render('products/products', {title:'Product listing', product_list: items, userid: userid, admin: admin})


    })

  })
});

router.post('/', function(req, res, next) {
  da.save_product(req.body, function(err) {
    res.redirect('/products');
  });
});

router.get('/add', function(req, res){
  var admin = req.session['admin_is'];
  var userid = req.session['userid'];
  res.render('products/add', {title: 'Add Product', userid: userid, admin: admin});
});

router.get('/delete', function(req, res){
  da.delete_product(req.query.id, function(err){
    res.redirect('/products');
  });
});


module.exports = router;
