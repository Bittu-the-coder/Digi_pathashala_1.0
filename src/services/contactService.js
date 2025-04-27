import API from './api';

/**
 * Submit a contact form to the server
 * @param {Object} contactData - The contact form data
 * @param {string} contactData.name - Name of the person
 * @param {string} contactData.email - Email of the person
 * @param {string} contactData.subject - Subject of the message
 * @param {string} contactData.message - Content of the message
 * @returns {Promise} - Promise with the response data
 */
export const submitContactForm = async (contactData) => {
  try {
    const response = await API.post('/contact', contactData);
    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: 'Error submitting contact form'
    };
  }
};

/**
 * Get all contact submissions (admin only)
 * @returns {Promise} - Promise with the response data
 */
export const getContactSubmissions = async () => {
  try {
    const response = await API.get('/contact');
    return response.data;
  } catch (error) {
    throw error.response?.data || {
      success: false,
      message: 'Error fetching contact submissions'
    };
  }
};
