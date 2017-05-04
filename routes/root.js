var express = require('express');
var router = express.Router();
var notidydb = require('../repository/notifydb');

/* GET home page */
router.get('/', function(req, res, next) {
  if (req.session.userProfile.notifyToken === '') {
    res.redirect('/auth/notify-line-login');
  }
  else {
    notidydb.getNotifySetting(req.session.userProfile.userId, function(rows) {
      res.render('index', {rows: rows});
    });
  }
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
