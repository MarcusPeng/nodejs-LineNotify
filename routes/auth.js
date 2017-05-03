var express = require('express');
var router = express.Router();
var lineService = require('../services/lineService');
var notifydb = require('../repository/notifydb');
var common = require('../services/common');
var config = require('../config');

//redirect to line
router.get('/access-line-login', function(req, res, next) {
    lineService.getAccessUrl('Login', function(accessUrl) { res.redirect(accessUrl); });
});

router.get('/notify-line-login', function(req, res, next) {
    lineService.getAccessUrl('Notify', function(accessUrl) { res.redirect(accessUrl); });
});

router.get('/line-notify-callback', function(req, res, next) {
    if (req.query.error) {
        res.render('error', {message: 'error', error: {status: req.query.error, stack: req.query.error_description}});
    }
    else if (req.query.code !== undefined && req.query.state === config.lineApi.state) {
        lineService.getAccessToken('Notify', req.query.code, function(error, response, body) {
            let item = common.parseJSON(body);
            if (item.status === 200) {
                notifydb.saveNotifyToken(req.session.userProfile.userId, item.access_token, function() {
                    notifydb.getUserProfile(req.session.userProfile.userId, function(userProfile) {
                        req.session.userProfile = userProfile;
                        if (userProfile.notifyToken === '') {
                            res.redirect('/auth/notify-line-login');
                        }
                        else {
                            res.redirect('/');
                        }
                    });
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

//line callback code and token
router.get('/line-login-callback', function(req, res, next) {
    if (req.query.errorCode === "417") {
        res.render('error', { message: req.query.errorMessage, error: {status: req.query.error, stack: req.query.error_description}});
    }
    else if (req.query.code !== undefined && req.query.state === config.lineApi.state) {
        //get token
        lineService.getAccessToken('Login', req.query.code, function(error, response, body) {
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
                        notifydb.saveUserProfile(item, function() {
                            notifydb.getUserProfile(item.userId, function(userProfile) {
                                req.session.userProfile = userProfile;
                                if (userProfile.notifyToken === '') {
                                    res.redirect('/auth/notify-line-login');
                                }
                                else {
                                    res.redirect('/');
                                }
                            });
                        });
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
