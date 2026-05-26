const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    getAbout,
    createAbout,
    updateAbout
} = require('../controllers/aboutController');

router.route('/')
    .get(getAbout)
    .post(protect, authorize('admin'), createAbout)
    .put(protect, authorize('admin'), updateAbout);

module.exports = router;
