const express = require('express');
const router = express.Router();
const { makeReservation, getMyReservations } = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware'); // Middleware adını yoxla

// Giriş etməyən istifadəçi rezervasiya edə bilməz
router.post('/', protect, makeReservation);
router.get('/my', protect, getMyReservations);

module.exports = router;