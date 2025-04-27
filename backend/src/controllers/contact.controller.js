const Contact = require('../models/contact.model');

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Create new contact submission
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      submittedAt: Date.now(),
    });

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Your message has been sent successfully',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message,
    });
  }
};
