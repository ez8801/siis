//
//  EZCrypto.js
//
//  2013.03.26  /  Minwoo Baek / usd122@naver.com
//
//  [Modify] - 2017.02.08 base64 -> hex
//

var events = require('events').EventEmitter
    , util = require('util')
    , crypto = require('crypto');

const key = 'MIIBCgKCAQEA+xGZ';

var cryptkey = crypto.createHash('sha256')
    .update('Nixnogen')
    .digest();
var algorithm = 'aes-256-cbc';
var iv = 'a2xhcgAAAAAAAAAA';

function EZCrypto() {
    if (false == (this instanceof EZCrypto)) {
        return new EZCrypto();
    }

    events.call(this);
}
util.inherits(EZCrypto, events);


EZCrypto.encrypt = function (text) {        
    var cipher = crypto.createCipher(algorithm, cryptkey);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}


EZCrypto.decrypt = function(text) {    
    if (text === null || typeof text === 'undefined' || text === '') {
        return text;
    }
    
    var decipher = crypto.createDecipher(algorithm, cryptkey);
    var decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = EZCrypto;

//  end of file "EZCrypto.js"