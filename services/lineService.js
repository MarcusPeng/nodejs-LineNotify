var request = require('request');
var config = require('../config');
var notifydb = require('../repository/notifydb');

const lineService = {
    getAccessUrl: function(callback) {
        notifydb.getApplicationInfo(function(applicationInfo) {
            const accessUrl = config.lineApi.weblogin + 
                "?response_type=code" +
                "&client_id=" + applicationInfo.channelId + 
                "&redirect_uri=" + config.lineApi.loginCallbackUrl +
                "&state=" + config.lineApi.state;
            callback && callback(accessUrl);
        });
    },

    getAccessToken: function(code, callback) {
        notifydb.getApplicationInfo(function(applicationInfo) {
            let options = {
                url: config.lineApi.accessToken,
                form: { 
                    grant_type:'authorization_code',
                    client_id: applicationInfo.channelId,
                    client_secret: applicationInfo.channelSecret,
                    code: code,
                    redirect_uri: config.lineApi.loginCallbackUrl
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
    }
};

module.exports = lineService;