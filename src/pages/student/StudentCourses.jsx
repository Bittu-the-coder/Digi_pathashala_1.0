import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { useCourses } from "../../context/CourseContext";
import { useAuth } from "../../context/AuthContext";
import { Search, AlertCircle } from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const StudentCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [courseToUnenroll, setCourseToUnenroll] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { getStudentCourses, unenrollCourse } = useCourses();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      fetchEnrolledCourses();
    }
  }, [currentUser]);

  const fetchEnrolledCourses = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const response = await getStudentCourses();
      if (response.success) {
        setEnrolledCourses(response.data);
      } else {
        console.error("Failed to fetch enrolled courses:", response.message);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/student/courses/${courseId}`);
  };

  const handleUnenrollConfirm = (course) => {
    setCourseToUnenroll(course);
    setShowConfirmModal(true);
  };

  const handleUnenroll = async () => {
    if (!courseToUnenroll) return;

    setActionLoading(true);
    try {
      const result = await unenrollCourse(courseToUnenroll._id);
      if (result.success) {
        // Remove the course from the state
        setEnrolledCourses(
          enrolledCourses.filter(
            (course) => course._id !== courseToUnenroll._id
          )
        );
      } else {
        console.error("Failed to unenroll:", result.error);
      }
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    } finally {
      setActionLoading(false);
      setShowConfirmModal(false);
      setCourseToUnenroll(null);
    }
  };

  // Filter courses based on search term
  const filteredCourses = enrolledCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof course.instructor === "object"
        ? course.instructor.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : course.instructor?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search your courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://source.unsplash.com/random/300x200/?${
                        course.category?.toLowerCase() || "education"
                      }`;
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {course.category}
                    </span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                      {course.level
                        ? course.level.charAt(0).toUpperCase() +
                          course.level.slice(1)
                        : "All Levels"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    by{" "}
                    {typeof course.instructor === "object"
                      ? course.instructor.name
                      : course.instructor}
                  </p>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `0%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex mt-4 space-x-2">
                    <button
                      onClick={() => handleViewCourse(course._id)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      View Course
                    </button>
                    <button
                      onClick={() => handleUnenrollConfirm(course)}
                      className="flex-1 bg-white border border-red-500 text-red-500 py-2 px-4 rounded-md hover:bg-red-50 transition-colors"
                    >
                      Unenroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium text-gray-700">
              You're not enrolled in any courses yet
            </h3>
            <p className="mt-2 text-gray-500">
              Explore and enroll in courses to start learning
            </p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed backdrop-blur-[5px] inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-2xl rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center text-red-500 mb-4">
              <AlertCircle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">Confirm Unenrollment</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to unenroll from{" "}
              <strong>{courseToUnenroll?.title}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleUnenroll}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                disabled={actionLoading}
              >
                {actionLoading ? "Processing..." : "Unenroll"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
