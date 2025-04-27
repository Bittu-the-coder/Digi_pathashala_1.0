import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import * as attendanceService from "../services/attendanceService";
import toast from "react-hot-toast";

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courseAttendance, setCourseAttendance] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState(null);
  const { currentUser } = useAuth();

  // Function to mark attendance for a course on a specific date
  const markAttendance = async (courseId, date, attendanceData) => {
    if (!courseId || !date || !attendanceData) {
      toast.error("Missing required attendance data");
      return { success: false, message: "Missing required attendance data" };
    }

    setLoading(true);
    try {
      const result = await attendanceService.markAttendance(
        courseId,
        date,
        attendanceData
      );

      if (result.success) {
        toast.success("Attendance marked successfully");
        // Refresh attendance data
        fetchCourseAttendance(courseId, date);
        return { success: true, data: result.data };
      } else {
        toast.error(result.message || "Failed to mark attendance");
        return { success: false, message: result.message };
      }
    } catch (error) {
      const errorMessage =
        error.message || "An error occurred while marking attendance";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Function to get attendance records for a course on a specific date
  const fetchCourseAttendance = async (courseId, date = null) => {
    if (!courseId) return;
    if (!currentUser || !["admin", "teacher"].includes(currentUser.role))
      return;

    setLoading(true);
    try {
      const result = await attendanceService.getCourseAttendance(
        courseId,
        date
      );

      if (result.success) {
        setCourseAttendance(result.data || []);
        setError(null);
        return { success: true, data: result.data };
      } else {
        setError(result.message || "Failed to fetch attendance records");
        setCourseAttendance([]);
        return { success: false, message: result.message };
      }
    } catch (error) {
      const errorMessage =
        error.message || "An error occurred while fetching attendance";
      setError(errorMessage);
      setCourseAttendance([]);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Function to get attendance statistics for a course
  const fetchCourseAttendanceStats = async (
    courseId,
    startDate = null,
    endDate = null
  ) => {
    if (!courseId) return;
    if (!currentUser || !["admin", "teacher"].includes(currentUser.role))
      return;

    setLoading(true);
    try {
      const result = await attendanceService.getCourseAttendanceStats(
        courseId,
        startDate,
        endDate
      );

      if (result.success) {
        setAttendanceStats(result.data || []);
        setError(null);
        return { success: true, data: result.data };
      } else {
        setError(result.message || "Failed to fetch attendance statistics");
        setAttendanceStats(null);
        return { success: false, message: result.message };
      }
    } catch (error) {
      const errorMessage =
        error.message ||
        "An error occurred while fetching attendance statistics";
      setError(errorMessage);
      setAttendanceStats(null);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Function to get attendance records for a student (across all courses or specific course)
  const fetchStudentAttendance = async (
    courseId = null,
    startDate = null,
    endDate = null
  ) => {
    if (!currentUser || !["student"].includes(currentUser.role)) return;

    setLoading(true);
    try {
      const result = await attendanceService.getStudentAttendance(
        courseId,
        startDate,
        endDate
      );

      if (result.success) {
        setStudentAttendance(result.data);
        setAttendanceStats(result.stats);
        setError(null);
        return {
          success: true,
          data: result.data,
          stats: result.stats,
        };
      } else {
        setError(result.message);
        setStudentAttendance([]);
        setAttendanceStats({
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
          excused: 0,
          percentage: 0,
        });
        return {
          success: false,
          message: result.message,
        };
      }
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch attendance";
      setError(errorMessage);
      setStudentAttendance([]);
      setAttendanceStats({
        total: 0,
        present: 0,
        absent: 0,
        late: 0,
        excused: 0,
        percentage: 0,
      });
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  // Load student attendance data when component mounts if user is a student
  useEffect(() => {
    if (currentUser && currentUser.role === "student") {
      fetchStudentAttendance();
    }
  }, [currentUser]);

  return (
    <AttendanceContext.Provider
      value={{
        loading,
        error,
        courseAttendance,
        studentAttendance,
        attendanceStats,
        markAttendance,
        fetchCourseAttendance,
        fetchCourseAttendanceStats,
        fetchStudentAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
