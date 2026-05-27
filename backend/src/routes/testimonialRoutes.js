const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    getAllTestimonials,
    getTestimonial,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/testimonialController');

router.route('/')
    .get(getAllTestimonials)
    .post(protect, authorize('admin'), createTestimonial);

router.route('/:id')
    .get(getTestimonial)
    .put(protect, authorize('admin'), updateTestimonial)
    .delete(protect, authorize('admin'), deleteTestimonial);

module.exports = router;
