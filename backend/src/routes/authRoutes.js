const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validateMiddleware');

// Diqqət: Bu marşrutlar app.js-dəki '/api/auth' prefiçinə birləşir
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;