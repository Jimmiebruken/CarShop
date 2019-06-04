var express = require('express');
var router = express.Router();
var da = require('../data_access/da');

router.post('/', function(req, res){
    var userid = req.session['userid'];
    da.search(req.body['search'], function(err, users){
        var admin = req.session['admin_is']
        da.getUserById(userid, function(err, user){
            res.render('users/users', {title:'User listing', user_list: users, userid: userid, admin: admin});
        });
    });
});

module.exports = router;