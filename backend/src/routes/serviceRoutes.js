const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    getAllServices,
    getService,
    createService,
    updateService,
    deleteService
} = require('../controllers/serviceController');

router.route('/')
    .get(getAllServices)
    .post(protect, authorize('admin'), createService);

router.route('/:id')
    .get(getService)
    .put(protect, authorize('admin'), updateService)
    .delete(protect, authorize('admin'), deleteService);

module.exports = router;
