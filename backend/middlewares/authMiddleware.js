const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken')

const authMiddleware = function(req, res, next) {

    const headerData = req.headers.authorization;
    if(!headerData.startsWith('Bearer ')){
        res.status(403).json('invalid token');
    }

    const token = headerData.split(' ')[1];

    if(!token) {
        res.status(403).json({msg : "invalid token"})
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