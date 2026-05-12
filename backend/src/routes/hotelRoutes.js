const express = require('express');
const { getHotels, createHotel } = require('../controllers/hotelController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getHotels);
router.post('/', protect, admin, createHotel); // Yalnız admin hotel yarada bilər

module.exports = router;