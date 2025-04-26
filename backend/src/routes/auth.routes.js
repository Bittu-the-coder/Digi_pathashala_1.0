/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const { register, login, getMe, registerBulkStudents } = require('../controllers/auth.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.post('/register-bulk', protect, authorize('admin'), registerBulkStudents);

module.exports = router;