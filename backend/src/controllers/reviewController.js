const Review = require('../models/Review');

// POST - Rəy yaz
exports.addReview = async (req, res, next) => {
    try {
        const review = await Review.create({
            ...req.body,
            user: req.user._id || req.user.id
        });
        res.status(201).json({ success: true, data: review });
    } catch (error) { next(error); }
};

// GET - Otel rəyləri
exports.getHotelReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ hotel: req.params.hotelId }).populate('user', 'name');
        res.status(200).json({ success: true, data: reviews });
    } catch (error) { next(error); }
};

// DELETE - Rəyi sil
exports.deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ success: false, message: "Rəy tapılmadı" });

        if (review.user.toString() !== (req.user._id || req.user.id).toString()) {
            return res.status(401).json({ success: false, message: "İcazəniz yoxdur" });
        }

        await review.deleteOne();
        res.status(200).json({ success: true, message: "Rəy silindi" });
    } catch (error) { next(error); }
};