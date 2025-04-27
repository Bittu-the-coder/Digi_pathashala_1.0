import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Check, X, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CourseContext";
import { useAttendance } from "../../context/AttendanceContext";

const CourseAttendance = () => {
  const { courseId } = useParams();
  const { currentUser } = useAuth();
  const { TeacherCourses, fetchInstructorCourses } = useCourses();
  const {
    markAttendance,
    fetchCourseAttendance,
    courseAttendance,
    loading: attendanceLoading,
    error: attendanceError,
  } = useAttendance();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [markingMode, setMarkingMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  // Fetch instructor courses on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser || !["admin", "teacher"].includes(currentUser.role))
        return;

      setLoading(true);
      setError(null);

      try {
        await fetchInstructorCourses();
      } catch (err) {
        setError(err.message || "Failed to load course data");
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  // Filter students by selected course
  useEffect(() => {
    if (!courseId) {
      setStudents([]);
      setAttendanceRecords([]);
      return;
    }

    const course = TeacherCourses.find((c) => c._id === courseId);
    if (course) {
      setStudents(course.enrolledStudents || []);
      fetchAttendanceRecords(courseId, selectedDate);
    } else {
      setStudents([]);
      setAttendanceRecords([]);
    }
  }, [courseId, TeacherCourses]);

  // Fetch attendance when date changes
  useEffect(() => {
    if (courseId && !loading) {
      fetchAttendanceRecords(courseId, selectedDate);
    }
  }, [selectedDate, courseId, loading]);

  const fetchAttendanceRecords = async (courseId, date) => {
    if (!courseId || !date) return;

    try {
      const result = await fetchCourseAttendance(courseId, date);
      if (result.success) {
        setAttendanceRecords(result.data || []);
        // Initialize attendance data for marking
        const initialAttendanceData = students.map((student) => {
          const record = result.data?.find(
            (r) => r.student._id === student._id
          );
          return {
            studentId: student._id,
            status: record?.status || "absent",
            remarks: record?.remarks || "",
          };
        });
        setAttendanceData(initialAttendanceData);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setError("Failed to load attendance records");
      toast.error("Failed to load attendance records");
    }
  };

  const handleStatusChange = (studentId, newStatus) => {
    setAttendanceData((prev) =>
      prev.map((item) =>
        item.studentId === studentId ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleRemarksChange = (studentId, remarks) => {
    setAttendanceData((prev) =>
      prev.map((item) =>
        item.studentId === studentId ? { ...item, remarks } : item
      )
    );
  };

  const saveAttendance = async () => {
    if (!courseId || !selectedDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      const result = await markAttendance(
        courseId,
        selectedDate,
        attendanceData
      );
      if (result.success) {
        setMarkingMode(false);
        toast.success("Attendance saved successfully");
        fetchAttendanceRecords(courseId, selectedDate);
      } else {
        toast.error(result.message || "Failed to save attendance");
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast.error("Failed to save attendance");
    }
  };

  const getAttendanceStatus = (studentId) => {
    const record = attendanceRecords.find((r) => r.student._id === studentId);
    return record ? record.status : "absent";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "excused":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white rounded-xl shadow-md p-6 text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  const course = TeacherCourses.find((c) => c._id === courseId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Course Attendance
          </h1>
          <p className="text-gray-600">{course?.title}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={16} className="text-gray-400" />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
            />
          </div>
          <button
            onClick={() => setMarkingMode(!markingMode)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              markingMode
                ? "bg-gray-200 text-gray-800"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            }`}
          >
            {markingMode ? (
              <>
                Cancel Marking
                <X size={18} />
              </>
            ) : (
              <>
                Mark Attendance
                <Check size={18} />
              </>
            )}
          </button>
        </div>
      </div>

      {attendanceLoading ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {markingMode && (
            <div className="p-4 border-b border-gray-200 bg-blue-50 flex justify-between items-center">
              <div className="text-blue-700">
                <span className="font-semibold">Mark Attendance for: </span>
                {course?.title} on {selectedDate}
              </div>
              <button
                onClick={saveAttendance}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Save size={16} />
                Save Attendance
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  {markingMode && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remarks
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.length > 0 ? (
                  students.map((student) => {
                    const studentAttendance = attendanceData.find(
                      (a) => a.studentId === student._id
                    );
                    const currentStatus = studentAttendance?.status || "absent";

                    return (
                      <tr key={student._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-bold">
                                {student.name?.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {student.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {student.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {markingMode ? (
                            <select
                              value={currentStatus}
                              onChange={(e) =>
                                handleStatusChange(student._id, e.target.value)
                              }
                              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-1 ${getStatusColor(
                                currentStatus
                              )}`}
                            >
                              <option value="present">Present</option>
                              <option value="absent">Absent</option>
                              <option value="late">Late</option>
                              <option value="excused">Excused</option>
                            </select>
                          ) : (
                            <span
                              className={`px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                getAttendanceStatus(student._id)
                              )}`}
                            >
                              {getAttendanceStatus(student._id)}
                            </span>
                          )}
                        </td>
                        {markingMode && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="text"
                                value={studentAttendance?.remarks || ""}
                                onChange={(e) =>
                                  handleRemarksChange(
                                    student._id,
                                    e.target.value
                                  )
                                }
                                placeholder="Add remarks"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-1"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    student._id,
                                    currentStatus === "present"
                                      ? "absent"
                                      : "present"
                                  )
                                }
                                className={`px-3 py-1 rounded-md ${
                                  currentStatus === "present"
                                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                                    : "bg-green-100 text-green-700 hover:bg-green-200"
                                }`}
                              >
                                {currentStatus === "present"
                                  ? "Mark Absent"
                                  : "Mark Present"}
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={markingMode ? 4 : 2}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No students enrolled in this course
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAttendance;
