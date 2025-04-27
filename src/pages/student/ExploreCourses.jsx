import React, { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, Check } from "lucide-react";
import CourseCard from "../../components/student/CourseCard";
import { useCourses } from "../../context/CourseContext";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const ExploreCourses = () => {
  const { courses, fetchCourses, enrollCourse, getStudentCourses } =
    useCourses();
  const { currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);

  useEffect(() => {
    fetchCourses();
    if (currentUser) {
      fetchEnrolledCourses();
    }
  }, [currentUser]);

  const fetchEnrolledCourses = async () => {
    if (!currentUser) return;

    try {
      const studentCourses = await getStudentCourses();
      // console.log("Student courses:", studentCourses);
      if (studentCourses.success) {
        const enrolledIds = studentCourses.data.map((course) => course._id);
        setEnrolledCourseIds(enrolledIds);
        // console.log("Enrolled course IDs:", enrolledIds);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  // Filter courses based on selected category, level, and search query
  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "All" || course.category === selectedCategory) &&
      (selectedLevel === "All Levels" ||
        course.level === selectedLevel.toLowerCase()) &&
      (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Categories and levels for filter
  const categories = [
    "All",
    "Mathematics",
    "Physics",
    "Programming",
    "Languages",
    "Business",
    "Science",
  ];
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  // Handle course enrollment
  const handleEnroll = async (courseId) => {
    if (enrolledCourseIds.includes(courseId)) {
      toast.success("You are already enrolled in this course");
      return;
    }

    try {
      setEnrollingCourseId(courseId);
      const result = await enrollCourse(courseId);

      if (result.success) {
        setEnrolledCourseIds([...enrolledCourseIds, courseId]);
        toast.success("Successfully enrolled in the course!");
      } else {
        toast.error(result.message || "Failed to enroll in the course");
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while enrolling"
      );
    } finally {
      setEnrollingCourseId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Explore Courses</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-between w-full p-4 bg-gray-100 rounded-lg"
          >
            <div className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-blue-600" />
              <span>Filter Courses</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                showFilters ? "transform rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Filters */}
        <div className={`${showFilters ? "block" : "hidden md:block"} mb-6`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
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
                  <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2 truncate">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    by{" "}
                    {typeof course.instructor === "object"
                      ? course.instructor.name
                      : course.instructor}
                  </p>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 line-clamp-2     truncate">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {course.price ? `$${course.price}` : "Free"}
                    </span>
                    <button
                      onClick={() => handleEnroll(course._id)}
                      className={`px-4 py-2 ${
                        enrolledCourseIds.includes(course._id)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white rounded-lg transition-colors`}
                      disabled={enrollingCourseId === course._id}
                    >
                      {enrolledCourseIds.includes(course._id) ? (
                        <Check className="w-5 h-5" />
                      ) : enrollingCourseId === course._id ? (
                        "Enrolling..."
                      ) : (
                        "Enroll"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCourses;
