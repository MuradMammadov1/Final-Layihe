const express = require('express');
const router = express.Router();
// Controller-dən funksiyaları import edirik
const { register, login } = require('../controllers/authController');

// Marşrutlar
router.post('/register', register);
router.post('/login', login); // Əgər 'login' undefined olsa, həmin xətanı verəcək

module.exports = router;