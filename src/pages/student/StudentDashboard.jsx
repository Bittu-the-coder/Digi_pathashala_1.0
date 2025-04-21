import React from "react";
import { useData } from "../../context/DataContext";
import StatsCard from "../../components/common/StatsCard";
import {
  BookOpenIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
} from "../../components/icons/Icons";

// Simple components for student dashboard
const RecentCourses = ({ courses }) => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Courses</h2>
    <ul className="divide-y divide-gray-200">
      {courses.map((course) => (
        <li key={course.id} className="py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-bold">
                {course.title.charAt(0)}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {course.title}
              </p>
              <p className="text-sm text-gray-500">{course.instructor}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
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
          <a
            href={classItem.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Join Class
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const StudentDashboard = () => {
  const { user, courses, liveClasses } = useData();

  // Define stats
  const stats = [
    {
      title: "Enrolled Courses",
      value: user?.enrolledCourses?.length || "0",
      icon: <BookOpenIcon />,
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      title: "Overall Progress",
      value: user?.progress ? `${user.progress}%` : "0%",
      icon: <ChartBarIcon />,
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
    {
      title: "Attendance Rate",
      value: user?.attendance ? `${user.attendance}%` : "0%",
      icon: <CheckCircleIcon />,
      bgColor: "bg-yellow-500",
      textColor: "text-white",
    },
    {
      title: "Upcoming Classes",
      value: "3",
      icon: <ClockIcon />,
      bgColor: "bg-purple-500",
      textColor: "text-white",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Student Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {user?.name || "Student"}!
        </p>
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
        <RecentCourses courses={courses.slice(0, 3)} />
        <UpcomingClasses classes={liveClasses.slice(0, 3)} />
      </div>
    </div>
  );
};

export default StudentDashboard;
