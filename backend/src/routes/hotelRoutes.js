const express = require('express');
const router = express.Router();

// Test üçün sadə bir GET route
router.get('/', (req, res) => {
    res.json({ message: "Hotellər siyahısı" });
});

module.exports = router; // BU SƏTİR MÜTLƏQDİR!