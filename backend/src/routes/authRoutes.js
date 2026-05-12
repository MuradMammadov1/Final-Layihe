const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Diqqət: Bu marşrutlar app.js-dəki '/api/auth' prefiçinə birləşir
router.post('/register', register);
router.post('/login', login);

module.exports = router;