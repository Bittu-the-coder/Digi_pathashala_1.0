import API from './api';

// Create new course
export const createCourse = async (courseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.post('/courses', courseData, config);
  return response.data;
};

// Get all courses
export const getAllCourses = async () => {
  const response = await API.get('/courses');
  return response.data;
};

// Get instructor courses
export const getInstructorCourses = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await API.get('/courses/instructor/courses', config);
    return response.data;
  } catch (error) {
    console.error('Error fetching instructor courses:', error.response?.data || error.message);
    throw error;
  }
};

// Get student courses
export const getStudentCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.get('/courses/student/courses', config);
  return response.data;
};

// Get single course
export const getCourse = async (courseId) => {
  const response = await API.get(`/courses/${courseId}`);
  return response.data;
};

// Update course
export const updateCourse = async (courseId, courseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.put(`/courses/${courseId}`, courseData, config);
  return response.data;
};

// Delete course
export const deleteCourse = async (courseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.delete(`/courses/${courseId}`, config);
  return response.data;
};

// Enroll in course
export const enrollCourse = async (courseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.post(`/courses/${courseId}/enroll`, {}, config);
  return response.data;
};

// Unenroll from course
export const unenrollCourse = async (courseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.delete(`/courses/${courseId}/enroll`, config);
  return response.data;
};

// Export all functions as named exports
export default {
  createCourse,
  getAllCourses,
  getInstructorCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  unenrollCourse,
  getStudentCourses,
};