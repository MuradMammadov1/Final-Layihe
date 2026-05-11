const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Hələlik test üçün sadə bir route
router.post('/', protect, (req, res) => {
    res.json({ message: "Rezervasiya sistemi aktivdir" });
});

module.exports = router; // BAX BU SƏTİR ÇOX VACİBDİR!