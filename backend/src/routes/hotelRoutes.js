const express = require('express');
const router = express.Router();
const { 
    getHotels, 
    getHotel, 
    createHotel, 
    updateHotel, 
    deleteHotel 
} = require('../controllers/hotelController');

// protect (giriş yoxlanışı) və authorize (rol yoxlanışı) middleware-lərini çağırırıq
const { protect, authorize } = require('../middleware/authMiddleware');

// /api/hotels
router.route('/')
    .get(getHotels) // Hamı baxa bilər (Giriş tələb olunmur)
    .post(protect, authorize('admin'), createHotel); // Yalnız Admin otel yarada bilər

// /api/hotels/:id
router.route('/:id')
    .get(getHotel) // Hamı baxa bilər
    .put(protect, authorize('admin'), updateHotel) // Yalnız Admin yeniləyə bilər
    .delete(protect, authorize('admin'), deleteHotel); // Yalnız Admin silə bilər (TƏHLÜKƏSİZ!)

module.exports = router;