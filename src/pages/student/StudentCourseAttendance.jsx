import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Check, X, Clock, Shield } from "lucide-react";
import { useAttendance } from "../../context/AttendanceContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CourseContext";

const StudentCourseAttendance = () => {
  const { courseId } = useParams();
  const { currentUser } = useAuth();
  const { courses } = useCourses();
  const { fetchCourseAttendance } = useAttendance();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendance, setAttendance] = useState({
    records: [],
    stats: {
      total: 0,
      present: 0,
      percentage: 0,
    },
  });

  const course = courses.find((c) => c._id === courseId);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        setLoading(true);
        const result = await fetchCourseAttendance(courseId);

        if (result?.success) {
          setAttendance({
            records: result.data || [],
            stats: {
              total: result.data.length,
              present: result.data.filter((r) => r.status === "present").length,
              percentage:
                Math.round(
                  (result.data.filter((r) => r.status === "present").length /
                    result.data.length) *
                    100
                ) || 0,
            },
          });
        } else {
          setError(result?.message || "Failed to load attendance data");
        }
      } catch (err) {
        setError(err.message || "Error loading attendance data");
      } finally {
        setLoading(false);
      }
    };

    if (courseId && currentUser) {
      loadAttendance();
    }
  }, [courseId, currentUser, fetchCourseAttendance]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <Check className="h-4 w-4 text-green-500" />;
      case "absent":
        return <X className="h-4 w-4 text-red-500" />;
      case "late":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "excused":
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Course Attendance
          </h1>
          <p className="text-gray-600">{course?.title}</p>
        </div>
        <div
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            attendance.stats.percentage >= 80
              ? "bg-green-100 text-green-800"
              : attendance.stats.percentage >= 60
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span>{attendance.stats.percentage}% Attendance</span>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marked By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendance.records.length > 0 ? (
              attendance.records.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.status === "present"
                            ? "bg-green-100 text-green-800"
                            : record.status === "absent"
                            ? "bg-red-100 text-red-800"
                            : record.status === "late"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {record.status.charAt(0).toUpperCase() +
                          record.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.markedBy?.name || "Teacher"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.remarks || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No attendance records found for this course
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Classes</h3>
          <p className="text-2xl font-bold">{attendance.stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Present</h3>
          <p className="text-2xl font-bold text-green-600">
            {attendance.stats.present}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Absent/Late</h3>
          <p className="text-2xl font-bold text-red-600">
            {attendance.stats.total - attendance.stats.present}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseAttendance;
