
var events = require('events').EventEmitter
    , util = require('util');

var async = require('async');
const mysql = require('mysql');

const config = {
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: 'Nmn372299!',
    database: 'hsc'
};

function EZDB() {
    if (false == (this instanceof EZDB)) {
        return new EZDB();
    }

    events.call(this);
}
util.inherits(EZDB, events);

EZDB.pool = mysql.createPool(config);

EZDB.query = function(query, finalCallback) {
    async.waterfall([
        function (callback) {
            EZDB.pool.getConnection(function (err, connection) {
                if (err) {
                    connection.release();
                    callback(err);
                }
                else callback(null, connection);
            });
        },
        function (connection, callback) {
            var onFinishQuery = function (err, results) {
                connection.release();

                if (err) callback(err);
                else callback(null, results);
            };
            connection.query(query, onFinishQuery);
        }
    ], function (err, results) {
        if (err) finalCallback(err);
        else finalCallback(null, results);
    });
};

module.exports = EZDB;

//  end of file "EZDB.js"