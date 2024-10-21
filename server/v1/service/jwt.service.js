const jwt = require('jsonwebtoken');
// const config = require('../config')
module.exports = {

    async issueJwtToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE }); // 10 min expiration
    },
    async verifyJwtToken(token, cb) {
        return jwt.verify(token, process.env.JWT_SECRET, cb);
    }
}


