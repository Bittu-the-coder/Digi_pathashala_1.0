import React, { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import StatsCard from "../../components/common/StatsCard";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ChartBar,
  CheckCircle,
  Clock,
  Calendar,
  Award,
  Video,
  BookOpen as BookOpenIcon,
  ChartBar as ChartBarIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
} from "lucide-react";
import { useCourses } from "../../context/CourseContext";
import { useAuth } from "../../context/AuthContext";

// Simple components for student dashboard
const RecentCourses = ({ courses }) => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Courses</h2>
    {courses.length > 0 ? (
      <>
        <ul className="divide-y divide-gray-200">
          {courses.map((course) => (
            <li key={course._id || course.id} className="py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">
                    {course.title.charAt(0)}
                  </span>
                </div>
                <div className="ml-3 flex-grow">
                  <p className="text-sm font-medium text-gray-900">
                    {course.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {typeof course.instructor === "object"
                      ? course.instructor.name
                      : course.instructor}
                  </p>
                  <div className="mt-1 w-full">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{course.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/student/courses/${course._id || course.id}`}
                  className="ml-4 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                >
                  Continue
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center">
          <Link
            to="/student/courses"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View all my courses
          </Link>
        </div>
      </>
    ) : (
      <div className="text-center py-5">
        <p className="text-gray-500 mb-4">
          You haven't enrolled in any courses yet
        </p>
        <Link
          to="/courses"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Explore Courses
        </Link>
      </div>
    )}
  </div>
);

const UpcomingClasses = ({ classes }) => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Classes</h2>
    <ul className="divide-y divide-gray-200">
      {classes.map((classItem) => (
        <li key={classItem.id} className="py-4">
          <p className="text-sm font-medium text-gray-900">{classItem.title}</p>
          <p className="text-sm text-gray-500">
            {new Date(classItem.date).toLocaleString()} ({classItem.duration})
          </p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {classItem.subject}
            </span>
            <a
              href={classItem.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join Class
            </a>
          </div>
        </li>
      ))}
    </ul>
    <div className="mt-4 text-center">
      <Link
        to="/student/live-classes"
        className="text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        View all scheduled classes
      </Link>
    </div>
  </div>
);

const RecentAttendance = ({ attendance }) => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-4">
      Attendance Summary
    </h2>
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Overall Attendance
        </span>
        <span className="text-sm font-medium text-gray-900">
          {Math.round(
            (attendance.filter((a) => a.present).length / attendance.length) *
              100
          )}
          %
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-600 h-2 rounded-full"
          style={{
            width: `${Math.round(
              (attendance.filter((a) => a.present).length / attendance.length) *
                100
            )}%`,
          }}
        ></div>
      </div>
    </div>

    <h3 className="text-sm font-medium text-gray-700 mb-2">Last 5 Classes</h3>
    <ul className="space-y-2">
      {attendance.slice(0, 5).map((record, index) => (
        <li key={index} className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{record.date}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              record.present
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {record.present ? "Present" : "Absent"}
          </span>
        </li>
      ))}
    </ul>

    <div className="mt-4 text-center">
      <Link
        to="/student/attendance"
        className="text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        View complete attendance record
      </Link>
    </div>
  </div>
);

const StudentDashboard = () => {
  const { liveClasses, attendance } = useData();
  const { currentUser } = useAuth();
  const { getStudentCourses } = useCourses();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = currentUser;

  // Fetch enrolled courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getStudentCourses();
        if (response && response.success) {
          setEnrolledCourses(response.data || []);
        } else {
          console.error("Failed to fetch student courses:", response?.message);
          setEnrolledCourses([]);
        }
      } catch (error) {
        console.error("Error fetching student courses:", error);
        setEnrolledCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [getStudentCourses]);

  // Use attendance data from context or fall back to sample data
  const attendanceRecords = user?.id
    ? attendance.filter((record) => record.studentId === user.id)
    : [
        { date: "2023-10-10", present: true, course: "Advanced Mathematics" },
        { date: "2023-10-09", present: true, course: "Physics Fundamentals" },
        { date: "2023-10-08", present: false, course: "Computer Science" },
        { date: "2023-10-07", present: true, course: "Advanced Mathematics" },
        { date: "2023-10-06", present: true, course: "Physics Fundamentals" },
        { date: "2023-10-05", present: true, course: "Computer Science" },
        { date: "2023-10-04", present: false, course: "Advanced Mathematics" },
      ];

  // Define stats
  const stats = [
    {
      title: "Enrolled Courses",
      value: enrolledCourses.length || "0",
      icon: <BookOpen className="h-5 w-5" />,
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      title: "Overall Progress",
      value: user?.progress ? `${user.progress}%` : "65%",
      icon: <ChartBar className="h-5 w-5" />,
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
    {
      title: "Attendance Rate",
      value: user?.attendance ? `${user.attendance}%` : "87%",
      icon: <CheckCircle className="h-5 w-5" />,
      bgColor: "bg-yellow-500",
      textColor: "text-white",
    },
    {
      title: "Upcoming Classes",
      value: liveClasses?.length || "3",
      icon: <Clock className="h-5 w-5" />,
      bgColor: "bg-purple-500",
      textColor: "text-white",
    },
  ];

  return (
    <div className="space-y-6">
      {/* <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Student Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {user?.name || "Student"}!
        </p>
      </div> */}

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/student/courses"
            className="bg-blue-50 p-3 rounded-lg flex flex-col items-center text-center hover:bg-blue-100 transition-colors"
          >
            <BookOpen size={20} className="text-blue-600 mb-1" />
            <span className="text-xs font-medium text-gray-800">
              My Courses
            </span>
          </Link>

          <Link
            to="/student/live-classes"
            className="bg-purple-50 p-3 rounded-lg flex flex-col items-center text-center hover:bg-purple-100 transition-colors"
          >
            <Video size={20} className="text-purple-600 mb-1" />
            <span className="text-xs font-medium text-gray-800">
              Live Classes
            </span>
          </Link>

          <Link
            to="/student/attendance"
            className="bg-green-50 p-3 rounded-lg flex flex-col items-center text-center hover:bg-green-100 transition-colors"
          >
            <Calendar size={20} className="text-green-600 mb-1" />
            <span className="text-xs font-medium text-gray-800">
              Attendance
            </span>
          </Link>

          <Link
            to="/student/progress"
            className="bg-orange-50 p-3 rounded-lg flex flex-col items-center text-center hover:bg-orange-100 transition-colors"
          >
            <Award size={20} className="text-orange-600 mb-1" />
            <span className="text-xs font-medium text-gray-800">
              My Progress
            </span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
          />
        ))}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center">
            <p>Loading your courses...</p>
          </div>
        ) : (
          <RecentCourses courses={enrolledCourses.slice(0, 3)} />
        )}
        <UpcomingClasses classes={liveClasses.slice(0, 3)} />
      </div>

      {/* Attendance Section */}
      <RecentAttendance attendance={attendanceRecords} />
    </div>
  );
};

export default StudentDashboard;
