const express = require('express');
const router = express.Router();
const { makeReservation, getMyReservations, cancelReservation } = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

// POST: Rezervasiya et | GET: Siyahını gör
router.route('/')
    .post(protect, makeReservation)
    .get(protect, getMyReservations);

// DELETE: Rezervasiyanı ləğv et
router.delete('/:id', protect, cancelReservation);

module.exports = router;