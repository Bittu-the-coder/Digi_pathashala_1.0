/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course is required for attendance'],
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student is required for attendance'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required for attendance'],
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'excused'],
      default: 'present',
    },
    markedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Teacher who marked attendance is required'],
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure one attendance record per student per course per day
attendanceSchema.index({ course: 1, student: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;