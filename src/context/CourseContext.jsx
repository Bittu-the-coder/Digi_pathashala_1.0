/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from "react";
import courseService from "../services/courseService";
import { useAuth } from "./AuthContext";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [TeacherCourses, setTeacherCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Fetch all courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await courseService.getAllCourses();
      setCourses(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch courses");
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses on initial load
  useEffect(() => {
    fetchCourses();
  }, []);

  // Create a new course
  const createCourse = async (courseData) => {
    try {
      const data = await courseService.createCourse(
        courseData,
        currentUser.token
      );
      setCourses((prev) => [...prev, data.data]);
      return { success: true, course: data.data };
    } catch (error) {
      console.error("Create course error:", error);
      return {
        success: false,
        error: error.message || "Failed to create course",
      };
    }
  };

  // Update a course
  const updateCourse = async (courseId, courseData) => {
    try {
      const data = await courseService.updateCourse(
        courseId,
        courseData,
        currentUser.token
      );
      setCourses((prev) =>
        prev.map((course) => (course._id === courseId ? data.data : course))
      );
      return { success: true, course: data.data };
    } catch (error) {
      console.error("Update course error:", error);
      return {
        success: false,
        error: error.message || "Failed to update course",
      };
    }
  };

  // Delete a course
  const deleteCourse = async (courseId) => {
    try {
      await courseService.deleteCourse(courseId, currentUser.token);
      setCourses((prev) => prev.filter((course) => course._id !== courseId));
      return { success: true };
    } catch (error) {
      console.error("Delete course error:", error);
      return {
        success: false,
        error: error.message || "Failed to delete course",
      };
    }
  };

  // Enroll in a course
  const enrollCourse = async (courseId) => {
    try {
      if (!currentUser || !["student"].includes(currentUser.role)) {
        console.error("User not authenticated");
        return {
          success: false,
          message: "You must be logged in to enroll in a course",
        };
      }

      // console.log("Attempting to enroll in course:", courseId);
      // console.log("Current user:", currentUser);

      const data = await courseService.enrollCourse(
        courseId,
        currentUser.token
      );

      // console.log("Enrollment response:", data);

      // Update the course in state to reflect enrollment
      setCourses((prev) =>
        prev.map((course) => (course._id === courseId ? data.data : course))
      );

      // Refresh courses after enrollment
      fetchCourses();

      return { success: true, course: data.data };
    } catch (error) {
      console.error("Enroll course error:", error);
      console.error(
        "Error details:",
        error.response?.data || "No response data"
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to enroll in course",
      };
    }
  };

  // Unenroll from a course
  const unenrollCourse = async (courseId) => {
    try {
      const data = await courseService.unenrollCourse(
        courseId,
        currentUser.token
      );
      // Update the course in state to reflect unenrollment
      setCourses((prev) =>
        prev.map((course) => (course._id === courseId ? data.data : course))
      );
      return { success: true, course: data.data };
    } catch (error) {
      console.error("Unenroll course error:", error);
      return {
        success: false,
        error: error.message || "Failed to unenroll from course",
      };
    }
  };

  // Get instructor courses
  const fetchInstructorCourses = async () => {
    if (!currentUser || !["admin", "teacher"].includes(currentUser.role)) {
      // console.log("User not authorized to fetch instructor courses");
      setTeacherCourses([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // console.log("Fetching instructor courses for user:", currentUser._id);
      const response = await courseService.getInstructorCourses(
        currentUser.token
      );

      if (response && response.data) {
        setTeacherCourses(response.data);
        // console.log("Fetched instructor courses:", response.data);
      } else {
        setError(response?.message || "Failed to fetch instructor courses");
        setTeacherCourses([]);
      }
    } catch (err) {
      console.error("Detailed error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch instructor courses"
      );
      setTeacherCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Get student enrolled courses
  const fetchStudentCourses = async () => {
    if (!currentUser || !["student"].includes(currentUser.role)) return;

    setLoading(true);
    try {
      const data = await courseService.getStudentCourses(currentUser.token);
      setCourses(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch enrolled courses");
      console.error("Error fetching enrolled courses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get student enrolled courses
  const getStudentCourses = async () => {
    if (!currentUser || !["student"].includes(currentUser.role)) {
      console.error("User not authenticated");
      return {
        success: false,
        message: "You must be logged in to view enrolled courses",
      };
    }

    try {
      // console.log("Fetching student courses with token:", currentUser.token);
      const response = await courseService.getStudentCourses(currentUser.token);
      // console.log("Student courses response:", response);
      return { success: true, data: response.data || [] };
    } catch (error) {
      console.error("Error fetching student courses:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch enrolled courses",
      };
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        error,
        TeacherCourses,
        fetchCourses,
        createCourse,
        updateCourse,
        deleteCourse,
        enrollCourse,
        unenrollCourse,
        fetchInstructorCourses,
        fetchStudentCourses,
        getStudentCourses,
        refetchCourses: fetchCourses, // Alias for fetchCourses
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
