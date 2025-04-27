/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { CalendarIcon, FilterIcon, Save, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CourseContext";
import { useAttendance } from "../../context/AttendanceContext";

const Attendance = () => {
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
  const [selectedCourse, setSelectedCourse] = useState("");
  const [markingMode, setMarkingMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  console.log("Attendance Data:", attendanceData);
  console.log("Attendance Records:", attendanceRecords);

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
    if (!selectedCourse || TeacherCourses.length === 0) {
      setStudents([]);
      setAttendanceRecords([]);
      setAttendanceData([]); // Reset attendance data when course changes
      return;
    }

    const course = TeacherCourses.find((c) => c._id === selectedCourse);
    if (course) {
      const enrolledStudents = course.enrolledStudents || [];
      setStudents(enrolledStudents);
      // Initialize attendance data with default values
      setAttendanceData(
        enrolledStudents.map((student) => ({
          studentId: student._id,
          status: "absent",
          remarks: "",
        }))
      );
      fetchAttendanceRecords(course._id, selectedDate);
    } else {
      setStudents([]);
      setAttendanceRecords([]);
      setAttendanceData([]);
    }
  }, [selectedCourse, TeacherCourses]);

  // Fetch attendance when date changes, but only if a course is selected
  useEffect(() => {
    if (selectedCourse && !loading) {
      fetchAttendanceRecords(selectedCourse, selectedDate);
    }
  }, [selectedDate, selectedCourse, loading]);

  const fetchAttendanceRecords = async (courseId, date) => {
    if (!courseId || !date) return;

    try {
      const result = await fetchCourseAttendance(courseId, date);
      if (result.success) {
        setAttendanceRecords(result.data || []);
        // Update attendance data with existing records
        setAttendanceData((prevData) => {
          return prevData.map((item) => {
            const existingRecord = result.data?.find(
              (r) => r.student._id === item.studentId
            );
            return existingRecord
              ? {
                  ...item,
                  status: existingRecord.status,
                  remarks: existingRecord.remarks || "",
                }
              : item;
          });
        });
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
    if (!selectedCourse || !selectedDate) {
      toast.error("Please select a course and date");
      return;
    }

    if (!attendanceData.length) {
      toast.error("No attendance data to save");
      return;
    }

    try {
      setLoading(true);
      const result = await markAttendance(
        selectedCourse,
        selectedDate,
        attendanceData
      );
      if (result.success) {
        setMarkingMode(false);
        toast.success("Attendance saved successfully");
        await fetchAttendanceRecords(selectedCourse, selectedDate);
      } else {
        toast.error(result.message || "Failed to save attendance");
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast.error("Failed to save attendance");
    } finally {
      setLoading(false);
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

  if (error && !selectedCourse) {
    return (
      <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white rounded-xl shadow-md p-6 text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Attendance Management
        </h1>
        {selectedCourse && (
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
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon size={16} className="text-gray-400" />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
            />
          </div>

          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FilterIcon size={16} className="text-gray-400" />
            </div>
            <select
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              disabled={loading}
            >
              <option value="">Select a course</option>
              {TeacherCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {attendanceLoading ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-xl">
          {markingMode && selectedCourse && (
            <div className="p-4 border-b border-gray-200 bg-blue-50 flex justify-between items-center">
              <div className="text-blue-700">
                <span className="font-semibold">Mark Attendance for: </span>
                {
                  TeacherCourses.find((c) => c._id === selectedCourse)?.title
                } on {selectedDate}
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

          {selectedCourse ? (
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
                      const currentStatus =
                        studentAttendance?.status || "absent";

                      return (
                        <tr key={student._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-600 font-bold">
                                  {student.name ? student.name.charAt(0) : "?"}
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
                                  handleStatusChange(
                                    student._id,
                                    e.target.value
                                  )
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
                                className={`px-4 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
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
          ) : (
            <div className="p-8 text-center">
              <div className="text-gray-500">
                Please select a course to view attendance
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendance;
