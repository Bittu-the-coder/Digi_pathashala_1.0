import API from './api';

/**
 * Mark attendance for a course on a specific date
 * @param {string} courseId - The ID of the course
 * @param {string} date - The date in ISO format
 * @param {Array} attendanceData - Array of { studentId, status, remarks } objects
 * @returns {Promise} API response
 */
export const markAttendance = async (courseId, date, attendanceData) => {
  try {
    const response = await API.post('/attendance', { courseId, date, attendanceData });
    return response.data;
  } catch (error) {
    console.error('Error marking attendance:', error.response?.data || error.message);
    throw error;
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
      ? `/attendance/course/${courseId}?date=${date}`
      : `/attendance/course/${courseId}`;

    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching course attendance:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get attendance statistics for a course
 * @param {string} courseId - The ID of the course
 * @param {string} startDate - Optional start date for date range filter
 * @param {string} endDate - Optional end date for date range filter
 * @returns {Promise} API response
 */
export const getCourseAttendanceStats = async (courseId, startDate = null, endDate = null) => {
  try {
    let url = `/attendance/stats/${courseId}`;
    const params = new URLSearchParams();

    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching course attendance stats:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get attendance records for the current student
 * @param {string} courseId - Optional course ID to filter by
 * @param {string} startDate - Optional start date for date range filter
 * @param {string} endDate - Optional end date for date range filter
 * @returns {Promise} API response
 */
export const getStudentAttendance = async (courseId = null, startDate = null, endDate = null) => {
  try {
    const params = new URLSearchParams();

    if (courseId) params.append('courseId', courseId);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const url = params.toString()
      ? `/attendance/student?${params.toString()}`
      : '/attendance/student';

    const response = await API.get(url);
    const responseData = response?.data || {};

    return {
      success: true,
      message: responseData.message || 'Attendance fetched successfully',
      data: Array.isArray(responseData.data) ? responseData.data : [],
      stats: {
        total: responseData?.stats?.total || 0,
        present: responseData?.stats?.present || 0,
        absent: responseData?.stats?.absent || 0,
        late: responseData?.stats?.late || 0,
        excused: responseData?.stats?.excused || 0,
        percentage: responseData?.stats?.percentage || 0
      }
    };
  } catch (error) {
    console.error('Error fetching student attendance:', error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to fetch attendance',
      data: [],
      stats: {
        total: 0,
        present: 0,
        absent: 0,
        late: 0,
        excused: 0,
        percentage: 0
      }
    };
  }
};

// Export all functions as named exports
export default {
  markAttendance,
  getCourseAttendance,
  getCourseAttendanceStats,
  getStudentAttendance
};