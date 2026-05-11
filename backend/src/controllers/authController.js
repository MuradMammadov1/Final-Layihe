const User = require('../models/User');

// Register funksiyası (əgər yoxdursa əlavə et)
exports.register = async (req, res, next) => {
    try {
        res.json({ message: "Register işləyir" });
    } catch (error) {
        next(error);
    }
};

// LOGIN funksiyası (Xətanın əsas səbəbi budur)
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        res.json({ message: "Login funksiyası tapıldı!", email });
    } catch (error) {
        next(error);
    }
};