const express = require('express');
const router = express.Router();
const { addReview, getHotelReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addReview); // Rəy yazmaq üçün giriş vacibdir
router.get('/:hotelId', getHotelReviews); // Hamı rəyləri görə bilsin

module.exports = router;