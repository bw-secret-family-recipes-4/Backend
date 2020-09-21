const jwt = require("jsonwebtoken");

module.exports = {
    isValid,
    signToken
};

function isValid(user){
    return Boolean(user.username && user.password && typeof user.password === "string");
}

function signToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }
    const secret = {
        jwtSecret: process.env.JWT_SECRET
    }
    const options = {
        expiresIn: '3h'
    }
    return jwt.sign(payload, secret.jwtSecret, options)
}