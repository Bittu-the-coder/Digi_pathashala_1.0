import API from './api';

// Get all users (admin only)
export const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.get('/users', config);
  return response.data;
};

// Get all students (admin/teacher)
export const getStudents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.get('/users/students', config);
  return response.data;
};

// Get all teachers (admin only)
export const getTeachers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.get('/users/teachers', config);
  return response.data;
};

// Get current user profile
export const getUserProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.get('/users/profile', config);
  return response.data;
};

// Update user profile
export const updateProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.put('/users/profile', profileData, config);
  return response.data;
};

// Update user by ID (admin only)
export const updateUser = async (userId, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.put(`/users/${userId}`, userData, config);
  return response.data;
};

// Delete user (admin only)
export const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.delete(`/users/${userId}`, config);
  return response.data;
};

export default {
  getUsers,
  getStudents,
  getTeachers,
  getUserProfile,
  updateProfile,
  updateUser,
  deleteUser,
};