/* eslint-disable no-unused-vars */
import React from "react";
import { useData } from "../../context/DataContext";
import ProgressChart from "../../components/student/ProgressChart";
import PerformanceTable from "../../components/student/PerformanceTable";

const StudentProgress = () => {
  const { user } = useData();

  // Sample performance data - in a real app, this would come from your context or API
  const performanceData = [
    {
      id: 1,
      course: "Advanced Mathematics",
      completed: 36,
      total: 48,
      grade: "A",
      lastActivity: "2 days ago",
    },
    {
      id: 2,
      course: "Physics Fundamentals",
      completed: 18,
      total: 40,
      grade: "B+",
      lastActivity: "1 week ago",
    },
    {
      id: 3,
      course: "Computer Science",
      completed: 12,
      total: 36,
      grade: "A-",
      lastActivity: "3 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-600 text-center mb-4">
        Under Construction
      </h2>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Progress</h1>
        <p className="text-gray-600">
          Track your learning journey and course performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left column - Chart */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Overall Progress
          </h2>
          <ProgressChart />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              You've completed 65% of your enrolled courses
            </p>
          </div>
        </div>

        {/* Right column - Stats */}
        <div className="md:col-span-3 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Course Performance
          </h2>
          <PerformanceTable data={performanceData} />
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Achievements</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {/* Sample Achievements */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-2">
              🏆
            </div>
            <span className="text-sm font-medium text-gray-800">
              Fast Learner
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
              ⭐
            </div>
            <span className="text-sm font-medium text-gray-800">
              Perfect Score
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-2">
              📝
            </div>
            <span className="text-sm font-medium text-gray-800">
              Completion
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
              🔍
            </div>
            <span className="text-sm font-medium text-gray-800">
              Problem Solver
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
              🎯
            </div>
            <span className="text-sm font-medium text-gray-800">
              Goal Achiever
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
