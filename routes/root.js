var express = require('express');
var router = express.Router();
var notidydb = require('../repository/notifydb');
var fs = require('fs');

/* GET home page */
router.get('/', function(req, res, next) {
  if (req.session.userProfile.notifyToken === '') {
    res.redirect('/auth/notify-line-login');
  }
  else {
    notidydb.getNotifySetting(req.session.userProfile.userId, function(rows) {
      fs.readdir(__dirname + '/../public/images/lineSticker',function(err, files) {
        let sticker = [];
        files.forEach(function(item, index){
          if (!item.startsWith('.')) {
            sticker.push(item);
          }
        });
        res.render('index', {rows: rows, sticker: sticker});
      })
    });
  }
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
