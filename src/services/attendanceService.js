import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

// Helper function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    return {
      success: false,
      message: error.response.data.message || 'An error occurred',
    };
  }
  return {
    success: false,
    message: error.message || 'Network error',
  };
};

// Get the auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Configure axios headers with auth token
const configureAxios = () => {
  const token = getAuthToken();
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

/**
 * Mark attendance for a course on a specific date
 * @param {string} courseId - The ID of the course
 * @param {string} date - The date in ISO format
 * @param {Array} attendanceData - Array of { studentId, status, remarks } objects
 * @returns {Promise} API response
 */
export const markAttendance = async (courseId, date, attendanceData) => {
  try {
    const response = await axios.post(
      `${API_URL}/attendance`,
      { courseId, date, attendanceData },
      configureAxios()
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get attendance records for a course on a specific date
 * @param {string} courseId - The ID of the course
 * @param {string} date - Optional date filter in ISO format
 * @returns {Promise} API response
 */
export const getCourseAttendance = async (courseId, date = null) => {
  try {
    const url = date
      ? `${API_URL}/attendance/course/${courseId}?date=${date}`
      : `${API_URL}/attendance/course/${courseId}`;
    const response = await axios.get(url, configureAxios());
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get attendance statistics for a course
 * @param {string} courseId - The ID of the course
 * @returns {Promise} API response
 */
export const getCourseAttendanceStats = async (courseId) => {
  try {
    const response = await axios.get(
      `${API_URL}/attendance/stats/${courseId}`,
      configureAxios()
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get attendance records for the current student
 * @param {string} courseId - Optional course ID to filter by
 * @returns {Promise} API response
 */
export const getStudentAttendance = async (courseId = null) => {
  try {
    const url = courseId
      ? `${API_URL}/attendance/student?courseId=${courseId}`
      : `${API_URL}/attendance/student`;
    const response = await axios.get(url, configureAxios());
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};