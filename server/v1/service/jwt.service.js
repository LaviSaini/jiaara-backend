const jwt = require('jsonwebtoken');
// const config = require('../config')
module.exports = {

    async issueJwtToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE }); // 10 min expiration
    },
    async verifyJwtToken(token, cb) {
        return jwt.verify(token, process.env.JWT_SECRET, cb);
    },
    async issueJwtRefreshToken(payload) {
        return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE })
    },
    async verifyJwtRefreshToken(token, cb) {
        return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, cb);
    },
    async decodeToken(token) {
        return jwt.decode(token)
    }

}


