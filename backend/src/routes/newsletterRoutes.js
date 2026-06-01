const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    subscribe,
    unsubscribe,
    getAllSubscribers
} = require('../controllers/newsletterController');

router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);
router.get('/subscribers', protect, authorize('admin'), getAllSubscribers);

module.exports = router;
