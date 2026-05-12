const express = require('express');
const router = express.Router();
const { 
    getHotels, 
    getHotel, 
    createHotel, 
    deleteHotel 
} = require('../controllers/hotelController');

// Bütün marşrutlar burada təyin olunmalıdır
router.get('/', getHotels);
router.get('/:id', getHotel);
router.post('/', createHotel); // Real layihədə bura admin qoruması əlavə ediləcək
router.delete('/:id', deleteHotel);

module.exports = router;