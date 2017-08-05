
var events = require('events').EventEmitter
    , util = require('util');

function Config() {
    if (false == (this instanceof Config)) {
        return new Config();
    }

    events.call(this);
}
util.inherits(Config, events);

Config.sessionKey = 'keyOfSession';
Config.facebookPermissions = {
    scope: ['email'],
    failureRedirect: '/login'
};

Config.titles = {
    'index': '한양대학교 산업융학학부 15학번'
    , 'ti': '한양대학교 산업융학학부 15학번'
};

Config.facebook = {
    clientID: '205443136576707'
    , clientSecret: 'b2deee237a925ee02b7e15cf491972f5'
    , callbackURL: 'http://siis.iptime.org/login/facebook/return'
};

Config.kakao = {
    clientID: 'bc12762fccb598ad4167096fcaa85401'
    , callbackURL: 'http://siis.iptime.org/oauth'
};

module.exports = Config;

// end of file "Config.js"