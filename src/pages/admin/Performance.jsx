import React from "react";
import { useData } from "../../context/DataContext";
import PerformanceChart from "../../components/admin/PerformanceChart";
import { TrendingUp } from "lucide-react";

const Performance = () => {
  const { courses } = useData();

  // Sample performance data - in a real app, this would come from your API
  const performanceData = [
    {
      id: 1,
      course: "Advanced Mathematics",
      enrollments: 45,
      completionRate: 78,
      averageGrade: "B+",
      trend: "+12%",
    },
    {
      id: 2,
      course: "Physics Fundamentals",
      enrollments: 38,
      completionRate: 82,
      averageGrade: "A-",
      trend: "+8%",
    },
    {
      id: 3,
      course: "Computer Science",
      enrollments: 52,
      completionRate: 75,
      averageGrade: "B",
      trend: "+15%",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Performance Analytics
        </h1>
      </div>

      {/* Performance Overview Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Course Performance Overview
        </h2>
        <div className="h-96">
          <PerformanceChart />
        </div>
      </div>

      {/* Detailed Performance Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Course-wise Performance
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performanceData.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.enrollments} students
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${item.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {item.completionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {item.averageGrade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {item.trend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Performance;
