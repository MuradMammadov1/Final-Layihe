const express = require('express');
const router = express.Router();
const {
    addReview,
    getHotelReviews,
    deleteReview,
    updateReview,
    getAllReviews
} = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');

// /api/review
router.route('/')
    .get(protect, authorize('admin'), getAllReviews)
    .post(protect, addReview); // Rəy yaz

// /api/review/:hotelId (Otelin rəylərini görmək üçün)
router.get('/:hotelId', getHotelReviews);

// /api/review/:id (Konkret bir rəyi redaktə və silmək üçün)
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;