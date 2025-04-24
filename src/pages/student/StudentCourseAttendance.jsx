import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { Calendar } from "lucide-react";

const StudentCourseAttendance = () => {
  const { courseId } = useParams();
  const { courses, user } = useData();

  const course = courses.find((c) => c.id === courseId);
  const attendanceRecords = [
    { date: "2023-11-01", status: "present" },
    { date: "2023-11-02", status: "absent" },
    { date: "2023-11-03", status: "present" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Course Attendance
          </h1>
          <p className="text-gray-600">{course?.title}</p>
        </div>
        <div className="bg-blue-100 px-4 py-2 rounded-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <span className="text-blue-800">85% Attendance</span>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceRecords.map((record, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === "present"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {record.status.charAt(0).toUpperCase() +
                      record.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentCourseAttendance;
