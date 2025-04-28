import React, { useState, useEffect } from "react";
import { useClass } from "../../context/ClassContext";
import { Link } from "react-router-dom";
import { CalendarIcon, FilterIcon, PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { useCourses } from "../../context/CourseContext";
import { useAuth } from "../../context/AuthContext";

const LiveClasses = () => {
  const { liveClasses, fetchLiveClasses, deleteLiveClass } = useClass();
  const { TeacherCourses, fetchInstructorCourses } = useCourses();
  const { currentUser } = useAuth();
  const [filterDate, setFilterDate] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);

  // Fetch instructor courses on component mount
  useEffect(() => {
    if (currentUser && ["admin", "teacher"].includes(currentUser.role)) {
      fetchInstructorCourses();
    }
  }, [currentUser]);

  // Fetch live classes based on filters
  useEffect(() => {
    fetchLiveClasses({
      date: filterDate,
      subject: filterSubject,
      course: filterCourse,
      instructorId: currentUser?._id, // Only fetch classes created by this instructor
    });
  }, [filterDate, filterSubject, filterCourse, currentUser]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}, ${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  };

  // Get unique subjects and courses for filters
  const subjects = [...new Set(liveClasses.map((c) => c.subject))];
  const courses = [...new Set(liveClasses.map((c) => c.course))];

  const handleDeleteClick = (classItem) => {
    setClassToDelete(classItem);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!classToDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      const result = await deleteLiveClass(classToDelete._id);
      if (result.success) {
        toast.success("Live class cancelled successfully");
        setShowDeleteModal(false);
      } else {
        toast.error(result.error || "Failed to cancel live class");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Live Classes</h1>
        <Link to="/admin/live-class/create">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all">
            <PlusCircle size={18} />
            Create New Class
          </button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4">
        {/* Date filter */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="text-gray-400" size={16} />
          </div>
          <input
            type="date"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        {/* Course filter - only shows courses by this instructor */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FilterIcon className="text-gray-400" size={16} />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
          >
            <option value="">All Courses</option>
            {TeacherCourses.map((course) => (
              <option key={course._id} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Subject filter */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FilterIcon className="text-gray-400" size={16} />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live classes table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {liveClasses.length > 0 ? (
                liveClasses.map((classItem) => (
                  <tr key={classItem._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {classItem.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(classItem.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {classItem.subject || "Not specified"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {classItem.duration} minutes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <a
                          href={classItem.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                        >
                          Join
                        </a>
                        <Link
                          to={`/admin/live-class/edit/${classItem._id}`}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(classItem)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No classes found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-filter backdrop-blur-[5px] flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Cancel Live Class
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                Are you sure you want to cancel this live class?
              </p>
              <p className="text-gray-900 font-medium">
                {classToDelete?.title} -{" "}
                {classToDelete ? formatDate(classToDelete.date) : ""}
              </p>
              <p className="text-sm text-red-600 mt-2">
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? "Cancelling..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveClasses;
