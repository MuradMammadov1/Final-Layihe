const express = require('express');
const router = express.Router();
const { 
    addReview, 
    getHotelReviews, 
    deleteReview 
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// /api/reviews
router.route('/')
    .post(protect, addReview); // Rəy yaz

// /api/reviews/:hotelId (Otelin rəylərini görmək üçün)
router.get('/:hotelId', getHotelReviews);

// /api/reviews/:id (Konkret bir rəyi silmək üçün)
router.delete('/:id', protect, deleteReview);

module.exports = router;