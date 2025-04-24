/* eslint-disable no-undef */
const Attendance = require('../models/attendance.model');
const Course = require('../models/course.model');
const User = require('../models/user.model');

// @desc    Mark attendance for a course
// @route   POST /api/attendance
// @access  Private/Admin/Teacher
exports.markAttendance = async (req, res) => {
  try {
    const { courseId, date, attendanceData } = req.body;

    // Validate required fields
    if (!courseId || !date || !attendanceData || !Array.isArray(attendanceData)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide courseId, date and attendance data',
      });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if the user is instructor of the course or admin
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to mark attendance for this course',
      });
    }

    // Process attendance records
    const attendanceRecords = [];
    const attendanceDate = new Date(date);

    // Delete existing attendance records for this date and course
    await Attendance.deleteMany({
      course: courseId,
      date: {
        $gte: new Date(attendanceDate.setHours(0, 0, 0)),
        $lt: new Date(attendanceDate.setHours(23, 59, 59))
      }
    });

    // Create new attendance records
    for (const record of attendanceData) {
      const { studentId, status, remarks } = record;

      // Validate student exists
      const student = await User.findById(studentId);
      if (!student) {
        continue; // Skip if student not found
      }

      // Create attendance record
      const attendanceRecord = {
        course: courseId,
        student: studentId,
        date: new Date(date),
        status: status || 'present',
        markedBy: req.user._id,
        remarks: remarks || ''
      };

      attendanceRecords.push(attendanceRecord);
    }

    // Batch insert attendance records
    if (attendanceRecords.length > 0) {
      await Attendance.insertMany(attendanceRecords);
    }

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      count: attendanceRecords.length
    });
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking attendance',
      error: error.message,
    });
  }
};

// @desc    Get attendance records for a course on a specific date
// @route   GET /api/attendance/course/:courseId
// @access  Private/Admin/Teacher
exports.getCourseAttendance = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { date } = req.query;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if the user is instructor of the course or admin
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view attendance for this course',
      });
    }

    // Build query
    const query = { course: courseId };

    // Add date filter if provided
    if (date) {
      const attendanceDate = new Date(date);
      query.date = {
        $gte: new Date(attendanceDate.setHours(0, 0, 0)),
        $lt: new Date(attendanceDate.setHours(23, 59, 59))
      };
    }

    // Get attendance records
    const attendance = await Attendance.find(query)
      .populate('student', 'name email')
      .populate('markedBy', 'name')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    console.error('Get course attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course attendance',
      error: error.message,
    });
  }
};

// @desc    Get attendance records for a student across all courses or specific course
// @route   GET /api/attendance/student
// @access  Private/Student
exports.getStudentAttendance = async (req, res) => {
  try {
    const { courseId } = req.query;
    const studentId = req.user._id;

    // Build query
    const query = { student: studentId };

    // Add course filter if provided
    if (courseId) {
      query.course = courseId;
    }

    // Get attendance records
    const attendance = await Attendance.find(query)
      .populate('course', 'title')
      .sort({ date: -1 });

    // Calculate attendance stats
    const stats = {
      total: attendance.length,
      present: attendance.filter(record => record.status === 'present').length,
      absent: attendance.filter(record => record.status === 'absent').length,
      late: attendance.filter(record => record.status === 'late').length,
      excused: attendance.filter(record => record.status === 'excused').length,
    };

    // Calculate attendance percentage
    stats.percentage = stats.total > 0
      ? Math.round((stats.present / stats.total) * 100)
      : 0;

    res.status(200).json({
      success: true,
      stats,
      data: attendance,
    });
  } catch (error) {
    console.error('Get student attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student attendance',
      error: error.message,
    });
  }
};

// @desc    Get attendance stats for a course
// @route   GET /api/attendance/stats/:courseId
// @access  Private/Admin/Teacher
exports.getCourseAttendanceStats = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if the user is instructor of the course or admin
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view stats for this course',
      });
    }

    // Get all attendance records for the course
    const attendanceRecords = await Attendance.find({ course: courseId });

    // Group records by student
    const studentMap = {};

    attendanceRecords.forEach(record => {
      if (!studentMap[record.student]) {
        studentMap[record.student] = {
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
          excused: 0,
        };
      }

      studentMap[record.student].total++;
      studentMap[record.student][record.status]++;
    });

    // Calculate attendance percentage for each student
    const stats = await Promise.all(Object.keys(studentMap).map(async (studentId) => {
      const student = await User.findById(studentId).select('name email');
      const stat = studentMap[studentId];
      return {
        student: {
          id: studentId,
          name: student ? student.name : 'Unknown',
          email: student ? student.email : 'Unknown',
        },
        stats: {
          ...stat,
          percentage: stat.total > 0 ? Math.round((stat.present / stat.total) * 100) : 0,
        },
      };
    }));

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Get course attendance stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course attendance stats',
      error: error.message,
    });
  }
};