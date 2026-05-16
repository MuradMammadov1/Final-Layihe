const express = require('express');
const router = express.Router();
const { 
    addReview, 
    getHotelReviews, 
    deleteReview,
    updateReview 
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// /api/review
router.route('/')
    .post(protect, addReview); // Rəy yaz

// /api/review/:hotelId (Otelin rəylərini görmək üçün)
router.get('/:hotelId', getHotelReviews);

// /api/review/:id (Konkret bir rəyi redaktə və silmək üçün)
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;