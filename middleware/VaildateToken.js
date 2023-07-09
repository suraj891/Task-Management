const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const vaildateToken = asynchandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decode) => {
            if (err) {
                res.status(401);
                throw new Error("user is not authorized")
            }
            // console.log(decode) 
            req.user = decode.user;
            next();
        })
        if (!token) {
            res.status(401);
            throw new Error("user is not authorized or Token")
        }
    }
})

module.exports = vaildateToken