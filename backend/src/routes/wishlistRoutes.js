const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

// /api/wishlist
router.route('/')
    .get(protect, getWishlist);

// /api/wishlist/:hotelId
router.route('/:hotelId')
    .post(protect, addToWishlist)
    .delete(protect, removeFromWishlist);

module.exports = router;