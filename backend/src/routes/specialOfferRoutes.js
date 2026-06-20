const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    getAllSpecialOffers,
    getAllSpecialOffersAdmin,
    getSpecialOffer,
    createSpecialOffer,
    updateSpecialOffer,
    deleteSpecialOffer
} = require('../controllers/specialOfferController');

router.route('/')
    .get(getAllSpecialOffers)
    .post(protect, authorize('admin'), createSpecialOffer);

router.route('/admin')
    .get(protect, authorize('admin'), getAllSpecialOffersAdmin);

router.route('/:id')
    .get(getSpecialOffer)
    .put(protect, authorize('admin'), updateSpecialOffer)
    .delete(protect, authorize('admin'), deleteSpecialOffer);

module.exports = router;
