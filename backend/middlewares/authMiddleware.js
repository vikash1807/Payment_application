const JWT_SECRET = require("../config");
const jwt = require('jsonwebtoken')

const authMiddleware = function(req, res, next) {

    const headerData = req.headers.authorization;
    const token = headerData.split(' ')[1];

    if(!token) {
        res.status(403).json({msg : "invalid credintials"})
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch(err) {
        res.status(403).json({msg : "invalid credintials"});
    }
}

module.exports = {
    authMiddleware
}