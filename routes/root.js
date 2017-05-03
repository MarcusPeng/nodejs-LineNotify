var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  if (req.session.userProfile.notifyToken === '') {
    res.redirect('/auth/notify-line-login');
  }
  else {
    res.render('index');
  }
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
