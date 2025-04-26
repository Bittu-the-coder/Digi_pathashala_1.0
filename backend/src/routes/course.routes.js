/* eslint-disable no-undef */

const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  getInstructorCourses,
  getStudentCourses,
  enrollCourse,
  unenrollCourse
} = require('../controllers/course.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', getAllCourses);

// Private student routes
router.get('/student/courses', protect, authorize('student'), getStudentCourses);
router.post('/:id/enroll', protect, authorize('student'), enrollCourse);
router.delete('/:id/enroll', protect, authorize('student'), unenrollCourse);

// Private admin/teacher routes
router.post('/', protect, authorize('admin', 'teacher'), createCourse);
router.get('/instructor/courses', protect, authorize('admin', 'teacher'), getInstructorCourses);
router.put('/:id', protect, authorize('admin', 'teacher'), updateCourse);
router.delete('/:id', protect, authorize('admin', 'teacher'), deleteCourse);

// This route should be last as it has a parameter that could match other routes
router.get('/:id', getCourse);

module.exports = router;