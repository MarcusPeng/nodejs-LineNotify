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
    saveUserProfile: function(userProfile) {
        const command = "CALL `notifydb`.`sp_saveUserProfile`(?, ?, ?, ?);";
        const parameters = [userProfile.userId, userProfile.displayName, userProfile.pictureUrl, userProfile.statusMessage];
        pool.query(command, parameters, function(err, rows, fields) {
            if (err) throw err;
        });
    },

    getApplicationInfo: function(callback) {
        pool.query('SELECT * FROM applicationInfo', function(err, rows, fields) {
            if (err) throw err;
            callback && callback(rows[0]);
        });
    }
};

module.exports = notifydb;