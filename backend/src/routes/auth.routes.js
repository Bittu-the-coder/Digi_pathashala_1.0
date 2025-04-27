/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  registerBulkStudents,
  forgotPassword,
  resetPassword,
  verifyResetCode
} = require('../controllers/auth.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-reset-code', verifyResetCode);

// Protected routes
router.get('/me', protect, getMe);
router.post('/register-bulk', protect, authorize('admin'), registerBulkStudents);

module.exports = router;