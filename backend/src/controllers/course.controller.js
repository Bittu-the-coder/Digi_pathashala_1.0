/* eslint-disable no-undef */
const Course = require('../models/course.model');
const User = require('../models/user.model');

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Admin/Teacher
exports.createCourse = async (req, res) => {
  try {
    // Add current user as instructor
    req.body.instructor = req.user._id;

    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message,
    });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email');

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message,
    });
  }
};

// @desc    Get courses taught by instructor
// @route   GET /api/courses/instructor
// @access  Private/Admin/Teacher
exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id }).populate('enrolledStudents', 'name email');

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error('Get instructor courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching instructor courses',
      error: error.message,
    });
  }
};

// @desc    Get courses enrolled by student
// @route   GET /api/courses/student
// @access  Private/Student
exports.getStudentCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const courses = await Course.find({
      '_id': { $in: user.enrolledCourses }
    }).populate('instructor', 'name email');

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error('Get student courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student courses',
      error: error.message,
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email')
      .populate('enrolledStudents', 'name email');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message,
    });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin/Teacher
exports.updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Make sure user is course instructor or admin
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'User not authorized to update this course',
      });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message,
    });
  }
};

// @desc    Enroll student in course
// @route   POST /api/courses/:id/enroll
// @access  Private/Student
exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if course has reached maximum capacity
    if (course.enrolledStudents.length >= course.maxStudents) {
      return res.status(400).json({
        success: false,
        message: 'Course has reached maximum enrollment',
      });
    }

    // Check if student is already enrolled
    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'Student already enrolled in this course',
      });
    }

    // Add student to course enrollments
    course.enrolledStudents.push(req.user._id);
    await course.save();

    // Add course to student's enrolled courses
    const user = await User.findById(req.user._id);
    user.enrolledCourses.push(course._id);
    await user.save();

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('Enroll course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error enrolling in course',
      error: error.message,
    });
  }
};

// @desc    Unenroll student from course
// @route   DELETE /api/courses/:id/enroll
// @access  Private/Student
exports.unenrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if student is enrolled
    if (!course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'Student not enrolled in this course',
      });
    }

    // Remove student from course enrollments
    course.enrolledStudents = course.enrolledStudents.filter(
      id => id.toString() !== req.user._id.toString()
    );
    await course.save();

    // Remove course from student's enrolled courses
    const user = await User.findById(req.user._id);
    user.enrolledCourses = user.enrolledCourses.filter(
      id => id.toString() !== course._id.toString()
    );
    await user.save();

    // Delete attendance records related to the student and course
    await Attendance.deleteMany({ course: course._id, student: req.user._id });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error('Unenroll course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error unenrolling from course',
      error: error.message,
    });
  }
};


// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin/Teacher
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Make sure user is course instructor or admin
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'User not authorized to delete this course',
      });
    }

    // Unenroll all students from the course
    for (const studentId of course.enrolledStudents) {
      const student = await User.findById(studentId);
      if (student) {
        student.enrolledCourses = student.enrolledCourses.filter(
          id => id.toString() !== course._id.toString()
        );
        await student.save();
      }
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message,
    });
  }
};