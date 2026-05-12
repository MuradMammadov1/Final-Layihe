const Review = require('../models/Review');

exports.addReview = async (req, res, next) => {
    try {
        const { hotelId, rating, comment } = req.body;
        const review = await Review.create({
            user: req.user._id || req.user.id,
            hotel: hotelId,
            rating,
            comment
        });
        res.status(201).json({ success: true, data: review });
    } catch (error) { next(error); }
};

exports.getHotelReviews = async (req, res, next) => {
    try {
        // Otelə aid rəyləri gətir və yazan şəxsin adını göstər
        const reviews = await Review.find({ hotel: req.params.hotelId })
                                    .populate('user', 'name');
        res.status(200).json({ success: true, data: reviews });
    } catch (error) { next(error); }
};