var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var admin = req.session['admin_is']
  var userid = req.session['userid'];
  res.render('index', { title: 'Social Network', userid: userid, admin: admin });
});

module.exports = router;
