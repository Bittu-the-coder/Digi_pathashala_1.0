import { useEffect, useState } from "react";
import CourseTable from "../../components/admin/CourseTable";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import { useCourses } from "../../context/CourseContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import { useAuth } from "../../context/AuthContext";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const { TeacherCourses, loading, error, fetchInstructorCourses } =
    useCourses();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser && ["admin", "teacher"].includes(currentUser.role)) {
      fetchInstructorCourses();
    }
  }, [currentUser]);

  const courses = TeacherCourses;

  // console.log("courses", courses);

  // Get unique categories for filter dropdown
  const categories = [
    "All Categories",
    ...new Set(courses.map((course) => course.category)),
  ];
  const statuses = [
    "All Status",
    "active",
    "inactive",
    "upcoming",
    "completed",
  ];

  const filteredCourses = courses.filter((course) => {
    // Search term filter
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.description &&
        course.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory =
      categoryFilter === "All Categories" || course.category === categoryFilter;

    // Status filter
    const matchesStatus =
      statusFilter === "All Status" ||
      course.status === statusFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={fetchInstructorCourses}
        className="my-6"
      />
    );
  }

  return (
    <div className="flex">
      <main className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Course Management
          </h1>
          <Link to="/admin/courses/new">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              + Add New Course
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search courses by title, description or category..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredCourses.length > 0 ? (
            <CourseTable
              courses={filteredCourses}
              onRefresh={fetchInstructorCourses}
            />
          ) : (
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900">
                No courses found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {courses.length === 0
                  ? "There are no courses available yet."
                  : "No courses match your search criteria."}
              </p>
              {courses.length === 0 && (
                <div className="mt-6">
                  <Link to="/admin/courses/new">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                      Create Your First Course
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Courses;
