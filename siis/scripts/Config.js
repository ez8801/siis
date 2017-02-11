
var events = require('events').EventEmitter
    , util = require('util');

function Config() {
    if (false == (this instanceof Config)) {
        return new Config();
    }

    events.call(this);
}
util.inherits(Config, events);

Config.sessionKey = '';

module.exports = Config;

// end of file "Config.js"