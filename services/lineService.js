var request = require('request');
var config = require('../config');
var notifydb = require('../repository/notifydb');

const lineService = {
    getAccessUrl: function(accessType, callback) {
        notifydb.getApplicationInfo(accessType, function(applicationInfo) {
            let accessUrl = accessType === 'Login' ? config.lineApi.weblogin : config.lineApi.notifyAuthorize;
            accessUrl += "?response_type=code";
            accessUrl += "&client_id=" + applicationInfo.channelId;
            accessUrl += "&redirect_uri=" + (accessType === 'Login' ? config.lineApi.loginCallbackUrl : config.lineApi.notifyCallbackUrl);
            accessUrl += (accessType === 'Login' ? "" : "&scope=notify");
            accessUrl += "&state=" + config.lineApi.state;
            callback && callback(accessUrl);
        });
    },

    getAccessToken: function(accessType, code, callback) {
        notifydb.getApplicationInfo(accessType, function(applicationInfo) {
            let options = {
                url: (accessType === 'Login' ? config.lineApi.accessToken : config.lineApi.notifyToken),
                form: { 
                    grant_type: 'authorization_code',
                    client_id: applicationInfo.channelId,
                    client_secret: applicationInfo.channelSecret,
                    code: code,
                    redirect_uri: (accessType === 'Login' ? config.lineApi.loginCallbackUrl : config.lineApi.notifyCallbackUrl)
                }
            };
            request.post(options, function(error, response, body) {
                callback && callback(error, response, body);
            });
        });
    },

    getUserProfile: function(accessToken, callback) {
        let options = {
            url: config.lineApi.userProfile,
            headers: { 'Authorization': 'Bearer ' + accessToken }
        };

        request.get(options, function(error, response, body) {
            callback && callback(error, response, body);
        });
    },

    sendNotify: function(item, callback) {
        let options = {
            url: config.lineApi.notify,
            headers: { 'Authorization': 'Bearer ' + item.notifyToken },
            form: item
        };
        request.post(options, function(error, response, body) {
            callback && callback(error, response, body);
        });
    }
};

module.exports = lineService;