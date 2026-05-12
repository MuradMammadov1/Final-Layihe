const express = require('express');
const router = express.Router();
const { getHotels, getHotel, createHotel, updateHotel, deleteHotel } = require('../controllers/hotelController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getHotels)
    .post(protect, createHotel); // Yalnız daxil olanlar (və ya Admin) yarada bilsin

router.route('/:id')
    .get(getHotel)
    .put(protect, updateHotel)
    .delete(protect, deleteHotel);

module.exports = router;