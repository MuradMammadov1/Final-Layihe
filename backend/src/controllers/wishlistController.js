const Wishlist = require('../models/Wishlist');
const Hotel = require('../models/Hotel');

// GET - İstifadəçinin wishlist-i
exports.getWishlist = async (req, res, next) => {
    try {
        const wishlist = await Wishlist.find({ user: req.user._id || req.user.id })
            .populate('hotel');
        const hotels = wishlist.map(w => w.hotel);
        res.status(200).json({ success: true, data: hotels });
    } catch (error) { next(error); }
};

// POST - Wishlist-ə otel əlavə et
exports.addToWishlist = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId || req.body.hotelId;
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Otel tapılmadı' });
        }

        const existing = await Wishlist.findOne({
            user: req.user._id || req.user.id,
            hotel: hotelId
        });

        if (existing) {
            return res.status(400).json({ success: false, message: 'Otel artıq wishlist-də var' });
        }

        const wishlist = await Wishlist.create({
            user: req.user._id || req.user.id,
            hotel: hotelId
        });

        res.status(201).json({ success: true, message: 'Otel wishlist-ə əlavə edildi', data: wishlist });
    } catch (error) { next(error); }
};

// DELETE - Wishlist-dən otel sil
exports.removeFromWishlist = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId;
        const wishlist = await Wishlist.findOneAndDelete({
            user: req.user._id || req.user.id,
            hotel: hotelId
        });

        if (!wishlist) {
            return res.status(404).json({ success: false, message: 'Otel wishlist-də tapılmadı' });
        }

        res.status(200).json({ success: true, message: 'Otel wishlist-dən silindi' });
    } catch (error) { next(error); }
};

// GET - Wishlist-də olub-olmadığını yoxla
exports.checkWishlist = async (req, res, next) => {
    try {
        const hotelId = req.params.hotelId;
        const wishlist = await Wishlist.findOne({
            user: req.user._id || req.user.id,
            hotel: hotelId
        });

        res.status(200).json({ success: true, isWishlisted: !!wishlist });
    } catch (error) { next(error); }
};