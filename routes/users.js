var express = require('express');
var router = express.Router();
var da = require('../data_access/da');


/* GET users listing. */
router.get('/', function(req, res, next) {
  da.findCustomers(function(err, users) {
    var userid = req.session['userid'];
    var admin = req.session['admin_is']
    if(userid){
      da.getUserById(userid, function(err, user){
        res.render('users/users', {title:'User listing', user_list: users, userid: userid, admin: admin});
      });
    }
    else {
      res.render('users/users', {title:'User listing', user_list: users});
    }

  });
});

router.post('/', function(req, res, next) {
  da.saveCustomerFromForm(req.body, function(err) {
    res.redirect('/users');
  });
});

router.get('/add', function(req, res){
  var admin = req.session['admin_is']
  var userid = req.session['userid'];
  res.render('users/add', {title: 'Add User', userid: userid, admin: admin});
});

router.get('/delete', function(req, res){
  da.deleteUser(req.query.id, function(err){
    res.redirect('/users');
  });
});

router.get('/admin', function (req, res) {
  da.admin_toggle(req.query.id, function (err) {
    res.redirect('/users');
  });
});

router.get('/admin_off', function (req, res) {
  da.admin_toggle_off(req.query.id, function (err) {
    res.redirect('/users');
  });
});


module.exports = router;
