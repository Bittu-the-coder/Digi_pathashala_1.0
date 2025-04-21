import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { courses = [], users = [] } = useData();

  // Calculate statistics - add default values and null checks
  const totalStudents = Array.isArray(users)
    ? users.filter((user) => user?.role === "student").length
    : 0;
  const totalCourses = Array.isArray(courses) ? courses.length : 0;
  const totalEnrollments = Array.isArray(users)
    ? users.reduce((total, user) => {
        if (user?.role === "student" && Array.isArray(user?.enrolledCourses)) {
          return total + user.enrolledCourses.length;
        }
        return total;
      }, 0)
    : 0;

  // Dummy attendance rate
  const averageAttendance = 88;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <span className="text-lg font-bold text-white">👥</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Students
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {totalStudents}
                  </div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                to="/admin/users"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all students
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <span className="text-lg font-bold text-white">📚</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Courses
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {totalCourses}
                  </div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                to="/admin/courses"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all courses
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <span className="text-lg font-bold text-white">🔖</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Enrollments
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {totalEnrollments}
                  </div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                to="/admin/courses"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                View details
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <span className="text-lg font-bold text-white">📋</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Attendance Rate
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {averageAttendance}%
                  </div>
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                to="/admin/attendance"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                View attendance
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Recent Courses
          </h2>
          <Link
            to="/admin/courses"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all
          </Link>
        </div>
        <div className="bg-white overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {(courses || []).slice(0, 3).map((course) => (
              <li key={course.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 rounded bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold">
                          {course.title?.charAt(0) || ""}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-indigo-600">
                          {course.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          Instructor: {course.instructor}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="bg-green-100 px-2 py-1 rounded-full text-green-800">
                        {course.students || 0} Students
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
