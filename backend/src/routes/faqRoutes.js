const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    getAllFAQs,
    getFAQ,
    createFAQ,
    updateFAQ,
    deleteFAQ
} = require('../controllers/faqController');

router.route('/')
    .get(getAllFAQs)
    .post(protect, authorize('admin'), createFAQ);

router.route('/:id')
    .get(getFAQ)
    .put(protect, authorize('admin'), updateFAQ)
    .delete(protect, authorize('admin'), deleteFAQ);

module.exports = router;
