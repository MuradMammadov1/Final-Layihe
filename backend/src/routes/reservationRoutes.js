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

// /api/reservation/user
router.route('/user')
    .get(protect, getMyReservations); // Öz rezervasiyalarına bax

// /api/reservation/all
router.route('/all')
    .get(protect, authorize('admin'), getMyReservations); // Admin bütün rezervasiyalara bax

// /api/reservation/status
router.route('/status')
    .put(protect, authorize('admin'), updateReservationStatus); // Admin status dəyiş

// /api/reservation/:id
router.delete('/:id', protect, cancelReservation); // Rezervasiyanı ləğv et
router.put('/:id/status', protect, authorize('admin'), updateReservationStatus); // Admin status dəyiş

module.exports = router;