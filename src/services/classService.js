import API from './api';

// Get all live classes
export const getLiveClasses = async (filters = {}) => {
  try {
    const response = await API.get('/live-classes', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching live classes:', error.response?.data || error.message);
    throw error;
  }
};

// Create a new live class
export const createLiveClass = async (liveClassData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await API.post('/live-classes', liveClassData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating live class:', error.response?.data || error.message);
    throw error;
  }
};

// Get a single live class
export const getLiveClassById = async (classId) => {
  try {
    const response = await API.get(`/live-classes/${classId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching live class:', error.response?.data || error.message);
    throw error;
  }
};

// Update a live class
export const updateLiveClass = async (classId, liveClassData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await API.put(`/live-classes/${classId}`, liveClassData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating live class:', error.response?.data || error.message);
    throw error;
  }
};

// Delete a live class
export const deleteLiveClass = async (classId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await API.delete(`/live-classes/${classId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting live class:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  getLiveClasses,
  getLiveClassById,
  createLiveClass,
  updateLiveClass,
  deleteLiveClass,
};