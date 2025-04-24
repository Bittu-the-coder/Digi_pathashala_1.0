import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { Calendar, Check, X } from "lucide-react";
import toast from "react-hot-toast";

const CourseAttendance = () => {
  const { courseId } = useParams();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [markingMode, setMarkingMode] = useState(false);
  const { courses, users } = useData();

  const course = courses.find((c) => c.id === courseId);
  const enrolledStudents = users.filter(
    (user) =>
      user.role === "student" && user.enrolledCourses?.includes(courseId)
  );

  const handleMarkAttendance = () => {
    // Implement attendance marking logic
    toast.success("Attendance marked successfully");
    setMarkingMode(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Course Attendance: {course?.title}
        </h1>
        <button
          onClick={() => setMarkingMode(!markingMode)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {markingMode ? "Cancel Marking" : "Mark Attendance"}
        </button>
      </div>

      {/* Add attendance marking interface */}
    </div>
  );
};

export default CourseAttendance;
