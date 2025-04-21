import React from "react";
import { CheckCircleIcon, XCircleIcon } from "../icons/Icons";

const AttendanceTable = ({ attendanceData }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Student
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
        {attendanceData.length > 0 ? (
          attendanceData.map((record, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-bold">
                      {record.studentName.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {record.studentName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {record.studentEmail}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.courseName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {record.present ? (
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-1" />
                    <span className="text-green-600">Present</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <XCircleIcon className="h-5 w-5 text-red-500 mr-1" />
                    <span className="text-red-600">Absent</span>
                  </div>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="4"
              className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
            >
              No attendance records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
