var config = require('../config');
var mysql = require('mysql');

var pool  = mysql.createPool({
    host: config.sql.host,
    user: config.sql.user,
    password: config.sql.password,
    database: config.sql.database,
    connectTimeout: 300000
});

const notifydb = {
    saveUserProfile: function(userProfile, callback) {
        const command = "CALL `notifydb`.`sp_saveUserProfile`(?, ?, ?, ?);";
        const parameters = [userProfile.userId, userProfile.displayName, userProfile.pictureUrl, userProfile.statusMessage];
        pool.query(command, parameters, function(err, rows, fields) {
            if (err) throw err;
            callback && callback();
        });
    },

    saveNotifyToken: function(userId, notifyToken, callback) {
        const command = "UPDATE userProfile SET notifyToken = ? WHERE userId = ?;";
        const parameters = [notifyToken, userId];
        pool.query(command, parameters, function(err, rows, fields) {
            if (err) throw err;
            callback && callback();
        });
    },

    getUserProfile: function(userId, callback) {
        const command = "SELECT * FROM notifydb.userProfile WHERE userId = ?;";
        const parameters = [userId];
        pool.query(command, parameters, function(err, rows, fields) {
            if (err) throw err;
            callback && callback(rows[0]);
        });
    },

    getApplicationInfo: function(name, callback) {
        pool.query("SELECT * FROM applicationInfo where name = ?;", [name], function(err, rows, fields) {
            if (err) throw err;
            callback && callback(rows[0]);
        });
    }
};

module.exports = notifydb;