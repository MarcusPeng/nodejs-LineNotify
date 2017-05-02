var express = require('express');
var router = express.Router();
var lineService = require('../services/lineService');
var notifydb = require('../repository/notifydb');
var common = require('../services/common');
var config = require('../config');

//redirect to line
router.get('/access-line-login', function(req, res, next) {
    lineService.getAccessUrl(function(accessUrl) { res.redirect(accessUrl);});
});

//line callback code and token
router.get('/line-login-callback', function(req, res, next) {
    if (req.query.errorCode === "417") {
        res.render('error', { message: req.query.errorMessage, error: {status: req.query.error, stack: req.query.error_description}});
    }
    else if (req.query.code !== undefined && req.query.state === config.lineApi.state) {
        //get token
        lineService.getAccessToken(req.query.code, function(error, response, body) {
            let item = common.parseJSON(body);

            if (item.access_token !== undefined) {
                //use token get user profile
                lineService.getUserProfile(item.access_token, function(error, response, body) {
                    item = common.parseJSON(body);

                    if (item.userId !== undefined) {
                        //save user profile
                        item.pictureUrl = item.pictureUrl === undefined ? "" : item.pictureUrl + "/large";
                        item.statusMessage = item.statusMessage === undefined ? "" : item.statusMessage ;
                        item.displayName = item.displayName === undefined ? "" : item.displayName ;
                        notifydb.saveUserProfile(item);
                        req.session.userProfile = item;
                        res.redirect('/');
                    }
                    else {
                        res.send(body);
                    }
                });
            }
            else {
                res.send(body);
            }
        });
    }
    else {
        res.redirect("/login");
    }
});

module.exports = router;
