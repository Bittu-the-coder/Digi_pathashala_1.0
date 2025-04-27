/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getCourseAttendance,
  getStudentAttendance,
  getCourseAttendanceStats
} = require('../controllers/attendance.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// Teacher/Admin routes
router.post('/', protect, authorize('admin', 'teacher'), markAttendance);
router.get('/course/:courseId', protect, authorize('admin', 'teacher'), getCourseAttendance);
router.get('/stats/:courseId', protect, authorize('admin', 'teacher'), getCourseAttendanceStats);

// Student routes
router.get('/student', protect, authorize('student'), getStudentAttendance);

module.exports = router;