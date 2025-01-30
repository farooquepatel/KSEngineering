const jwt = require('jsonwebtoken');
const { failed } = require('../helper/response');  

module.exports = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];  

    if (!token) {
        return failed(res, "Access token is missing or invalid.");
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return failed(res, "Invalid or expired token.");
        }

        // Attach user info to request object for further use
        req.user = decoded; 
        next(); 
    });
};
