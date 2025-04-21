import React from "react";
import { useData } from "../../context/DataContext";
import StatsCard from "../../components/common/StatsCard";
import {
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
} from "../../components/icons/Icons";

const StudentAttendance = () => {
  const { user, getStudentAttendance } = useData();

  // Get attendance for current user or use empty array if not available
  const attendanceRecords = user ? getStudentAttendance(user.id) : [];

  // Calculate attendance statistics
  const presentDays = attendanceRecords.filter(
    (record) => record.present
  ).length;
  const totalDays = attendanceRecords.length;
  const attendancePercentage =
    totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
  const absentDays = totalDays - presentDays;

  const stats = [
    {
      title: "Attendance Rate",
      value: `${attendancePercentage}%`,
      icon: <CalendarIcon />,
      bgColor: "bg-indigo-500",
      textColor: "text-white",
    },
    {
      title: "Present Days",
      value: presentDays,
      icon: <CheckCircleIcon />,
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
    {
      title: "Absent Days",
      value: absentDays,
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

      {/* Attendance Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Attendance History
          </h3>
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceRecords.length > 0 ? (
                attendanceRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.date}
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
                    colSpan="2"
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
