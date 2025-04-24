import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Users,
  BookOpen,
  CheckSquare,
  BarChart2,
  Calendar,
  VideoIcon,
} from "lucide-react";

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
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
        <Link to="/admin/courses/new">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all">
            <PlusCircle size={18} />
            Create New Course
          </button>
        </Link>
      </div>

      <div className="text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/courses/new"
            className="bg-blue-50 p-4 rounded-lg flex flex-col items-center text-center hover:bg-blue-100 transition-colors"
          >
            <BookOpen size={24} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">
              Host New Course
            </span>
          </Link>

          <Link
            to="/admin/attendance/mark"
            className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center hover:bg-green-100 transition-colors"
          >
            <CheckSquare size={24} className="text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">
              Mark Attendance
            </span>
          </Link>

          <Link
            to="/admin/live-class/create"
            className="bg-purple-50 p-4 rounded-lg flex flex-col items-center text-center hover:bg-purple-100 transition-colors"
          >
            <VideoIcon size={24} className="text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">
              Start Live Class
            </span>
          </Link>

          <Link
            to="/admin/analytics"
            className="bg-orange-50 p-4 rounded-lg flex flex-col items-center text-center hover:bg-orange-100 transition-colors"
          >
            <BarChart2 size={24} className="text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">
              View Analytics
            </span>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <Users className="h-6 w-6 text-white" />
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
                to="/admin/students"
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
                <BookOpen className="h-6 w-6 text-white" />
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
                <Users className="h-6 w-6 text-white" />
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
                to="/admin/enrollments"
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
                <Calendar className="h-6 w-6 text-white" />
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

      {/* Student Performance */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Student Performance
          </h2>
          <Link
            to="/admin/analytics/performance"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View detailed analysis
          </Link>
        </div>

        <div className="p-6 border-t border-gray-200">
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
                    Progress
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Activity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample data - would come from API in real app */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">A</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Aditya Patel
                        </div>
                        <div className="text-sm text-gray-500">
                          aditya@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Advanced Mathematics
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">65%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2 hours ago
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-bold">P</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Priya Sharma
                        </div>
                        <div className="text-sm text-gray-500">
                          priya@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Physics Fundamentals
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: "82%" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">82%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1 day ago
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
