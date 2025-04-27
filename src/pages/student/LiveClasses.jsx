import React, { useState, useEffect } from "react";
import { useClass } from "../../context/ClassContext";
import { useCourses } from "../../context/CourseContext";
import { useAuth } from "../../context/AuthContext";
import LiveClassCard from "../../components/student/LiveClassCard";
import { CalendarIcon, FilterIcon } from "../../components/icons/Icons";

const LiveClasses = () => {
  const { liveClasses: allLiveClasses, fetchLiveClasses, loading } = useClass();
  const { getStudentCourses } = useCourses();
  const { currentUser } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [enrolledClassesLoading, setEnrolledClassesLoading] = useState(true);

  // Fetch student enrolled courses
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (currentUser) {
        try {
          setEnrolledClassesLoading(true);
          const result = await getStudentCourses();
          if (result.success) {
            setEnrolledCourses(result.data || []);
          }
        } catch (err) {
          console.error("Error fetching enrolled courses:", err);
        } finally {
          setEnrolledClassesLoading(false);
        }
      }
    };
    fetchEnrolledCourses();
  }, [currentUser]);

  // Get enrolled course titles for filtering live classes
  const enrolledCourseTitles = enrolledCourses.map((course) => course.title);

  // Fetch live classes with filters
  useEffect(() => {
    fetchLiveClasses({
      date: filterDate,
      subject: filterSubject,
      course: filterCourse,
    });
  }, [filterDate, filterSubject, filterCourse]);

  // Process the date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }) +
      ", " +
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    );
  };

  // Add display data to live classes and filter by enrolled courses
  const processedClasses = allLiveClasses
    .filter((classItem) => enrolledCourseTitles.includes(classItem.course))
    .map((classItem) => ({
      ...classItem,
      time: formatDate(classItem.date),
      participants: classItem.participants || 0,
    }));

  // Filter classes based on selected type
  const filteredClasses =
    filterType === "all"
      ? processedClasses
      : filterType === "upcoming"
      ? processedClasses.filter((c) => new Date(c.date) > new Date())
      : processedClasses.filter((c) => new Date(c.date) <= new Date());

  // Get unique subjects and courses from available classes
  const availableSubjects = [
    ...new Set(processedClasses.map((c) => c.subject)),
  ];
  const availableCourses = [...new Set(processedClasses.map((c) => c.course))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Live Classes
          </h1>
          <p className="text-gray-600">
            Attend interactive online sessions for your enrolled courses
          </p>
        </div>

        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              filterType === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border border-gray-300`}
          >
            All Classes
          </button>
          <button
            type="button"
            onClick={() => setFilterType("upcoming")}
            className={`px-4 py-2 text-sm font-medium ${
              filterType === "upcoming"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border-t border-b border-r border-gray-300`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => setFilterType("completed")}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              filterType === "completed"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border-t border-b border-r border-gray-300`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="text-gray-400" />
          </div>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Course filter - only shows enrolled courses */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FilterIcon className="text-gray-400" />
          </div>
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Courses</option>
            {availableCourses.map((course, idx) => (
              <option key={idx} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FilterIcon className="text-gray-400" />
          </div>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Subjects</option>
            {availableSubjects.map((subject, idx) => (
              <option key={idx} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading || enrolledClassesLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : /* Live Classes Grid */
      filteredClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <LiveClassCard key={classItem._id} classItem={classItem} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="text-gray-400 text-6xl mb-4">📺</div>
          <h3 className="text-xl font-medium text-gray-900">
            No classes found
          </h3>
          <p className="mt-2 text-gray-500">
            {enrolledCourses.length === 0
              ? "You are not enrolled in any courses yet."
              : `There are no ${
                  filterType !== "all" ? filterType : ""
                } live classes
                available for your enrolled courses.`}
          </p>
          {enrolledCourses.length === 0 && (
            <Link
              to="/student/explore-courses"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Explore Courses
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveClasses;
