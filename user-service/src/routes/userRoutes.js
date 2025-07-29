const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile, getUsers, verifyEmail, forgotPassword, resetPassword, changeUserPassword } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { registerSchema, loginSchema } = require('../validators/userValidators');
const { forgotSchema, resetSchema } = require('../validators/passwordValidators');

// Ruta de registro de usuario
router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), authUser);
router.get('/profile', protect, getUserProfile);
router.get('/', protect, admin, getUsers);
router.get('/verify/:token', verifyEmail);
router.post('/forgot-password', validateRequest(forgotSchema), forgotPassword);
router.put('/reset-password/:token', validateRequest(resetSchema), resetPassword);
router.put('/:id/password', protect, admin, changeUserPassword);

module.exports = router;
