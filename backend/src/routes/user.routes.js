const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth.middleware');

// Import controllers
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateProfile,
  getStudents
} = require('../controllers/user.controller');

// Admin-only routes
router.get('/', protect, authorize('admin'), getUsers);
router.get('/students', protect, authorize('admin', 'teacher'), getStudents);
router.delete('/:id', protect, authorize('admin'), deleteUser);

// Protected routes for all users
router.get('/profile', protect, getUser);
router.put('/profile', protect, updateProfile);

// Admin route for updating any user
router.put('/:id', protect, authorize('admin'), updateUser);

module.exports = router;