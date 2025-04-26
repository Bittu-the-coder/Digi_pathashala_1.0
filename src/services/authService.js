import API from './api';

export const adminSignIn = async (email, password) => {
  try {
    const response = await API.post('/auth/login', {
      email,
      password,
      role: 'admin' // Ensure only admin can login through this
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Login failed' };
  }
};

export const studentSignIn = async (email, password) => {
  try {
    const response = await API.post('/auth/login', {
      email,
      password,
      role: 'student'
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Login failed' };
  }
};

export const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Registration failed' };
  }
};

export const registerBulkStudents = async (students) => {
  try {
    const response = await API.post('/auth/register-bulk', { students });
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Bulk registration failed' };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await API.get('/users/profile');
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to fetch user' };
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await API.put('/users/profile', profileData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: 'Failed to update profile' };
  }
};

export const logout = async () => {
  try {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Optional: Call backend logout endpoint if you have one
    // await API.post('/auth/logout');
  } catch (err) {
    throw err.response?.data || { message: 'Logout failed' };
  }
};