import React from "react";
import { useData } from "../../context/DataContext";
import { BarChart2, Users, BookOpen, TrendingUp, Calendar } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const { courses, users } = useData();

  const stats = [
    {
      name: "Total Students",
      value: users?.filter((u) => u.role === "student").length || 0,
      icon: Users,
      change: "+12%",
      changeType: "increase",
    },
    {
      name: "Active Courses",
      value: courses?.filter((c) => c.status === "Active").length || 0,
      icon: BookOpen,
      change: "+5%",
      changeType: "increase",
    },
    {
      name: "Attendance Rate",
      value: "87%",
      icon: Calendar,
      change: "+3%",
      changeType: "increase",
    },
    {
      name: "Course Completion",
      value: "76%",
      icon: TrendingUp,
      change: "+8%",
      changeType: "increase",
    },
  ];

  // Sample chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Course Enrollments",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(99, 102, 241, 0.5)",
      },
      {
        label: "Course Completions",
        data: [45, 49, 60, 71, 46, 45],
        backgroundColor: "rgba(16, 185, 129, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Course Analytics",
      },
    },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span
                  className={`font-medium ${
                    stat.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-gray-500"> from previous period</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <Bar options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

export default Analytics;
