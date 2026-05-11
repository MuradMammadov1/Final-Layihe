const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    res.json({ message: "Qeydiyyat bölməsi" });
});

module.exports = router; // BU SƏTİR MÜTLƏQDİR! [cite: 7, 52]