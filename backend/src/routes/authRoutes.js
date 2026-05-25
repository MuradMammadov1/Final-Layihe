const express = require('express');
const router = express.Router();
const { register, login, getMe, updateMe, getAllUsers, updateUserRole, deleteUser } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validateMiddleware');
const { protect, authorize } = require('../middleware/authMiddleware');

// Diqqət: Bu marşrutlar app.js-dəki '/api/auth' prefiçinə birləşir
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);

// Admin user management
router.get('/users', protect, authorize('admin'), getAllUsers);
router.put('/users/:id', protect, authorize('admin'), updateUserRole);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

module.exports = router;