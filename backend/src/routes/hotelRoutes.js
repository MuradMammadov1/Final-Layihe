const express = require('express');
const router = express.Router();
const { 
    getHotels, 
    getHotel, 
    createHotel, 
    updateHotel, 
    deleteHotel,
    getStats
} = require('../controllers/hotelController');

// protect (giriş yoxlanışı) və authorize (rol yoxlanışı) middleware-lərini çağırırıq
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// /api/hotels
router.route('/')
    .get(getHotels) // Hamı baxa bilər (Giriş tələb olunmur)
    .post(protect, authorize('admin'), upload.array('images', 5), createHotel); // Yalnız Admin otel yarada bilər

// /api/hotels/:id
router.route('/:id')
    .get(getHotel) // Hamı baxa bilər
    .put(protect, authorize('admin'), upload.array('images', 5), updateHotel) // Yalnız Admin yeniləyə bilər
    .delete(protect, authorize('admin'), deleteHotel); // Yalnız Admin silə bilər (TƏHLÜKƏSİZ!)

// /api/hotels/stats
router.get('/stats', protect, authorize('admin'), getStats); // Admin statistikaları

module.exports = router;