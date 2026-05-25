const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    createRoom,
    getRoom,
    updateRoom,
    deleteRoom,
    getHotelRooms,
    getAllRooms
} = require('../controllers/roomController');

router.route('/')
    .get(getAllRooms)
    .post(protect, authorize('admin'), createRoom);

router.route('/hotel/:hotelId')
    .get(getHotelRooms);

router.route('/:id')
    .get(getRoom)
    .put(protect, authorize('admin'), updateRoom)
    .delete(protect, authorize('admin'), deleteRoom);

module.exports = router;
