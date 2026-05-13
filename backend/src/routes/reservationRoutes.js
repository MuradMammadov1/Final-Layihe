const express = require('express');
const router = express.Router();
const { 
    makeReservation, 
    getMyReservations, 
    cancelReservation 
} = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

// /api/reservations
router.route('/')
    .post(protect, makeReservation) // Rezervasiya et
    .get(protect, getMyReservations); // Öz rezervasiyalarına bax

// /api/reservations/:id
router.delete('/:id', protect, cancelReservation); // Rezervasiyanı ləğv et

module.exports = router;