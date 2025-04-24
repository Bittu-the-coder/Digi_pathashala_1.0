import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { CalendarIcon, FilterIcon, Save, Check, X } from "lucide-react";
import toast from "react-hot-toast";

const Attendance = () => {
  const { attendance } = useData();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [selectedCourse, setSelectedCourse] = useState("");
  const [markingMode, setMarkingMode] = useState(false);

  // Use attendance data from context
  const attendanceData = attendance.map((record, index) => ({
    id: index + 1,
    studentName: "Student " + record.studentId, // In a real app, you'd look up the student name
    studentEmail: "student" + record.studentId + "@example.com",
    courseName: record.course,
    date: record.date,
    present: record.present,
  }));

  // Sample courses for the dropdown
  const courses = [
    { id: 1, name: "Introduction to React" },
    { id: 2, name: "Advanced JavaScript" },
    { id: 3, name: "Database Design" },
    { id: 4, name: "Data Structures" },
    { id: 5, name: "Algorithms" },
  ];

  // State for tracking attendance being marked
  const [attendanceMarking, setAttendanceMarking] = useState(
    attendanceData.map((record) => ({
      ...record,
      marked: record.present,
    }))
  );

  // Handler for toggling student attendance
  const toggleAttendance = (studentId) => {
    setAttendanceMarking(
      attendanceMarking.map((record) =>
        record.id === studentId ? { ...record, marked: !record.marked } : record
      )
    );
  };

  // Save attendance changes
  const saveAttendance = () => {
    // In a real app, this would send the data to your backend API
    // For now, we'll just show a success message
    toast.success("Attendance saved successfully!");
    setMarkingMode(false);
    // Update the main attendance data with our marked values
    // This would normally happen via an API call response
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Attendance Management
        </h1>
        <button
          onClick={() => setMarkingMode(!markingMode)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            markingMode
              ? "bg-gray-200 text-gray-800"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          }`}
        >
          {markingMode ? (
            <>
              Cancel Marking
              <X size={18} />
            </>
          ) : (
            <>
              Mark Attendance
              <Check size={18} />
            </>
          )}
        </button>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon size={16} className="text-gray-400" />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
              placeholder="Select date"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FilterIcon size={16} className="text-gray-400" />
            </div>
            <select
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">All courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        {markingMode ? (
          <div className="p-4 border-b border-gray-200 bg-blue-50 flex justify-between items-center">
            <div className="text-blue-700">
              <span className="font-semibold">Mark Attendance: </span>
              Select present/absent for each student
            </div>
            <button
              onClick={saveAttendance}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Save size={16} />
              Save Attendance
            </button>
          </div>
        ) : null}

        <div className="overflow-x-auto">
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
                {markingMode && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceMarking.map((record) => (
                <tr key={record.id}>
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
                    {markingMode ? (
                      <span
                        className={`px-4 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                          record.marked
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {record.marked ? "Present" : "Absent"}
                      </span>
                    ) : (
                      <span
                        className={`px-4 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                          record.present
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {record.present ? "Present" : "Absent"}
                      </span>
                    )}
                  </td>
                  {markingMode && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => toggleAttendance(record.id)}
                        className={`px-3 py-1 rounded-md ${
                          record.marked
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {record.marked ? "Mark Absent" : "Mark Present"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
