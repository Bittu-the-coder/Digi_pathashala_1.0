import React from "react";
import { Link, useParams } from "react-router-dom";
import { useCourses } from "../../context/CourseContext";
import { useAuth } from "../../context/AuthContext";

const CourseDetails = () => {
  const { courseId } = useParams();
  const { courses } = useCourses();
  const { currentUser } = useAuth();

  // Find the course with the matching ID
  const course = courses.find((c) => c._id === courseId);
  // console.log(course);

  if (!course) {
    return <div className="p-4">Course not found</div>;
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Course Thumbnail */}
        <div className="h-64 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Course Details */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {course.title}
              </h1>
              <p className="text-gray-600">{course.category}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                course.status === "active"
                  ? "bg-green-100 text-green-800"
                  : course.status === "upcoming"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
            </span>
          </div>

          <p className="text-gray-700 mb-6">{course.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Instructor Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Instructor</h3>
              <p className="text-gray-600">{currentUser.name}</p>
              <p className="text-gray-500 text-sm">{currentUser.email}</p>
            </div>

            {/* Course Level */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Level</h3>
              <p className="text-gray-600 capitalize">{course.level}</p>
            </div>

            {/* Schedule */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Schedule</h3>
              <p className="text-gray-600">
                {course.schedule?.days?.join(", ")}
                <br />• {course.schedule?.startTime} -{" "}
                {course.schedule?.endTime}
              </p>
            </div>

            {/* Duration */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Duration</h3>
              <p className="text-gray-600">{course.duration}</p>
            </div>
          </div>

          {/* Dates and Enrollment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Start Date</h3>
              <p className="text-gray-600">{formatDate(course.startDate)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">End Date</h3>
              <p className="text-gray-600">{formatDate(course.endDate)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Enrollment</h3>
              <p className="text-gray-600">
                {course.enrolledStudents?.length || 0} / {course.maxStudents}{" "}
                students
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Price</h3>
            <p className="text-blue-600 text-xl font-bold">
              {course.price === 0 ? "Free" : `$${course.price}`}
            </p>
          </div>

          <Link
            to={`/admin/courses/${course._id}/attendance`}
            className="block"
          >
            <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              <svg
                className="w-5 h-5 inline-block mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              View Attendance
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
