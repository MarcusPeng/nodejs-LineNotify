var express = require('express');
var router = express.Router();
var lineService = require('../services/lineService');
var common = require('../services/common');

/* send notify */
router.post('/send', function(req, res, next) {
    lineService.sendNotify(req.body.message, req.session.userProfile.notifyToken, function(error, response, body) {
        let item = common.parseJSON(body);
        res.status(200).send(item);
    });
});

module.exports = router;
