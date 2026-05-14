const express = require('express');
const router = express.Router();
const { 
    makeReservation, 
    getMyReservations, 
    cancelReservation,
    updateReservationStatus
} = require('../controllers/reservationController');
const { protect, authorize } = require('../middleware/authMiddleware');

// /api/reservation
router.route('/')
    .post(protect, makeReservation) // Rezervasiya et
    .get(protect, getMyReservations); // Öz rezervasiyalarına bax

// /api/reservation/:id
router.delete('/:id', protect, cancelReservation); // Rezervasiyanı ləğv et
router.put('/:id/status', protect, authorize('admin'), updateReservationStatus); // Admin status dəyiş

module.exports = router;