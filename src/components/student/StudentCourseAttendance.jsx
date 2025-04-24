import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { Calendar } from "lucide-react";

const StudentCourseAttendance = () => {
  const { courseId } = useParams();
  const { user, courses } = useData();
  const course = courses.find((c) => c.id === courseId);

  // This would come from your API/context in a real app
  const attendanceRecords = [
    { date: "2023-11-01", present: true },
    { date: "2023-11-02", present: false },
    // Add more records
  ];

  const attendanceRate = Math.round(
    (attendanceRecords.filter((r) => r.present).length /
      attendanceRecords.length) *
      100
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Attendance for {course?.title}
        </h1>
        <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="text-blue-800 font-medium">
            {attendanceRate}% Attendance
          </span>
        </div>
      </div>

      {/* Add attendance history table */}
    </div>
  );
};

export default StudentCourseAttendance;
