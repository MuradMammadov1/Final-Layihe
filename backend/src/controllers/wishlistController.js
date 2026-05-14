const User = require('../models/User');

// GET - İstifadəçinin wishlist-i
exports.getWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id || req.user.id).populate('wishlist');
        res.status(200).json({ success: true, data: user.wishlist });
    } catch (error) { next(error); }
};

// POST - Wishlist-ə otel əlavə et
exports.addToWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id || req.user.id);
        if (!user.wishlist.includes(req.params.hotelId)) {
            user.wishlist.push(req.params.hotelId);
            await user.save();
        }
        res.status(200).json({ success: true, message: 'Otel wishlist-ə əlavə edildi' });
    } catch (error) { next(error); }
};

// DELETE - Wishlist-dən otel sil
exports.removeFromWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id || req.user.id);
        user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.hotelId);
        await user.save();
        res.status(200).json({ success: true, message: 'Otel wishlist-dən silindi' });
    } catch (error) { next(error); }
};