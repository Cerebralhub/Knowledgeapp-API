'use strict';
const jwt                              = require('jsonwebtoken');
const fs                               = require('fs');

module.exports = function (token) {

    let cert      = fs.readFileSync('jwt_pubk.key','utf8');  // get public key
    try{
        return  jwt.verify(token, cert, { algorithms: ['RS256'] });
    }catch (e) {
        console.log(e);
    }
}