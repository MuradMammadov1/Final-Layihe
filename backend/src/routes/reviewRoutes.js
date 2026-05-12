const express = require('express');
const router = express.Router();
const { addReview, getHotelReviews, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, addReview);

router.route('/:hotelId')
    .get(getHotelReviews);

router.delete('/:id', protect, deleteReview); // Öz rəyini silmək üçün

module.exports = router;