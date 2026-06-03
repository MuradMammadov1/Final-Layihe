const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist, checkWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

// /api/wishlist
router.route('/')
    .get(protect, getWishlist);

// /api/wishlist/check/:hotelId
router.get('/check/:hotelId', protect, checkWishlist);

// /api/wishlist/:hotelId
router.route('/:hotelId')
    .post(protect, addToWishlist)
    .delete(protect, removeFromWishlist);

module.exports = router;