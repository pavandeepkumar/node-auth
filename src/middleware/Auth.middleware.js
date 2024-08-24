const jwt = require('jsonwebtoken');

// Middleware function to authenticate JWT token
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Malformed authorization header' });
    }

    const token = parts[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        if (!user) {
            return res.status(403).json({ message: 'Token verification failed: user data is missing' });
        }

        req.user = user;
        next();
    });
};
module.exports =  authenticateJWT 