import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import StatsCard from "../../components/common/StatsCard";
import {
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  FilterIcon,
} from "../../components/icons/Icons";

const StudentAttendance = () => {
  const { user, getStudentAttendance } = useData();
  const [selectedCourse, setSelectedCourse] = useState("all");

  // Get attendance for current user or use empty array if not available
  const attendanceRecords = user ? getStudentAttendance(user.id) : [];

  // Group attendance records by course
  const courseAttendance = attendanceRecords.reduce((acc, record) => {
    if (!acc[record.course]) {
      acc[record.course] = [];
    }
    acc[record.course].push(record);
    return acc;
  }, {});

  // Calculate course-wise statistics
  const courseStats = Object.entries(courseAttendance).map(
    ([course, records]) => {
      const presentDays = records.filter((r) => r.present).length;
      const totalDays = records.length;
      const percentage = Math.round((presentDays / totalDays) * 100);
      return { course, presentDays, totalDays, percentage };
    }
  );

  // Filter records based on selected course
  const filteredRecords =
    selectedCourse === "all"
      ? attendanceRecords
      : attendanceRecords.filter((record) => record.course === selectedCourse);

  // Calculate overall statistics
  const overallPresent = attendanceRecords.filter((r) => r.present).length;
  const overallTotal = attendanceRecords.length;
  const overallPercentage =
    overallTotal > 0 ? Math.round((overallPresent / overallTotal) * 100) : 0;

  const stats = [
    {
      title: "Overall Attendance",
      value: `${overallPercentage}%`,
      icon: <CalendarIcon />,
      bgColor: "bg-indigo-500",
      textColor: "text-white",
    },
    {
      title: "Total Present Days",
      value: overallPresent,
      icon: <CheckCircleIcon />,
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
    {
      title: "Total Absent Days",
      value: overallTotal - overallPresent,
      icon: <XCircleIcon />,
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance</h1>
        <p className="text-gray-600">Track your class attendance records</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
          />
        ))}
      </div>

      {/* Course-wise Stats */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Course-wise Attendance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseStats.map(({ course, percentage, presentDays, totalDays }) => (
            <div key={course} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900">{course}</h4>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Attendance Rate</span>
                  <span className="font-medium">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {presentDays} / {totalDays} days present
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Table with Course Filter */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Attendance History
          </h3>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FilterIcon className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Courses</option>
              {Object.keys(courseAttendance).map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Course
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.present
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {record.present ? "Present" : "Absent"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500"
                  >
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
