const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT Auth [cite: 57]
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            next(new Error('Yetkisiz giriş, token xətalıdır'));
        }
    }
    if (!token) {
        res.status(401);
        next(new Error('Token tapılmadı'));
    }
};