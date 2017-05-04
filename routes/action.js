var express = require('express');
var router = express.Router();
var lineService = require('../services/lineService');
var common = require('../services/common');
var notifydb = require('../repository/notifydb');

/* send notify */
router.post('/send', function(req, res, next) {
    lineService.sendNotify(req.body.message, req.session.userProfile.notifyToken, function(error, response, body) {
        let item = common.parseJSON(body);
        res.status(200).send(item);
    });
});

router.get('/logout', function(req, res, next){
    req.session.userProfile = null;
    res.redirect('/');
});

router.post('/add-setting', function(req, res, next) {
    let item = req.body;
    item.userId = req.session.userProfile.userId;
    notifydb.insertNotifySetting(item, function() {
        res.send();
    });
});

router.post('/delete-setting', function(req, res, next) {
    let item = req.body;
    item.userId = req.session.userProfile.userId;
    notifydb.deleteNotifySetting(item, function() {
        res.send();
    });
});

module.exports = router;
