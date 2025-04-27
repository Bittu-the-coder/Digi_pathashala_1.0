/* eslint-disable no-undef */
const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt');
const emailjs = require('@emailjs/nodejs');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone, specialization } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Create user based on role
    const userData = {
      name,
      email,
      password,
      phone,
      role: role || 'student', // Default to student if not specified
    };

    // Add teacher-specific fields
    if (role === 'admin' || role === 'teacher') {
      userData.specialization = specialization || '';
    }

    const user = await User.create(userData);

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        specialization: user.specialization,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during registration',
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // If role is provided, check if it matches user role
    if (role && user.role !== role) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized. Invalid user type',
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        specialization: user.specialization,
        interests: user.interests,
        enrolledCourses: user.enrolledCourses,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
      error: error.message,
    });
  }
};

// @desc    Register multiple students in bulk
// @route   POST /api/auth/register-bulk
// @access  Private (Admin only)
exports.registerBulkStudents = async (req, res) => {
  try {
    const { students } = req.body;

    if (!students || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid list of students'
      });
    }

    // Plain password - will be hashed by the pre-save hook in the User model
    const password = 'design@123';

    const results = [];
    const errors = [];

    for (const student of students) {
      try {
        const email = `${student.regNo}@mmmut.ac.in`.toLowerCase();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          errors.push({ regNo: student.regNo, message: 'User already exists' });
          continue;
        }

        const userData = {
          name: student.name,
          email,
          password, // The pre-save hook will hash this automatically
          role: 'student',
          bio: `Father's Name: ${student.fatherName}`
        };

        const user = await User.create(userData);
        results.push({
          _id: user._id,
          name: user.name,
          email: user.email,
          regNo: student.regNo
        });
      } catch (error) {
        errors.push({
          regNo: student.regNo,
          message: error.message
        });
      }
    }

    res.status(200).json({
      success: true,
      message: `Successfully registered ${results.length} students`,
      registered: results.length,
      failed: errors.length,
      results,
      errors
    });
  } catch (error) {
    console.error('Bulk registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during bulk registration',
      error: error.message
    });
  }
};

// @desc    Forgot Password - Send verification code
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with that email address',
      });
    }

    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Set reset token and expiration (1 hour)
    user.resetPasswordToken = verificationCode;
    user.resetPasswordExpire = Date.now() + 3600000;
    await user.save();

    // Calculate expiration time for display in email
    const expirationDate = new Date(Date.now() + 3600000);
    const formattedExpirationTime = expirationDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Send email
    try {
      // Send email with parameters matching the template variables
      const response = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        {
          // Match the exact template variables from the HTML template
          passcode: verificationCode,
          time: formattedExpirationTime,
          website_url: 'https://digipathashala.com',
          support_url: 'https://digipathashala.com/support',
          to_email: email,
          email: email,
          recipient: email,
          user_name: user.name || email.split('@')[0],
          subject: "Password Reset Verification Code - Digi Pathashala"
        },
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY,
          privateKey: process.env.EMAILJS_PRIVATE_KEY
        }
      );

      console.log('Email sent successfully:', response);
      res.status(200).json({
        success: true,
        message: 'Verification code sent to your email address',
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      res.status(200).json({
        success: true,
        message: 'If your email is registered, you will receive a verification code',
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing your request',
      error: error.message,
    });
  }
};

// @desc    Verify Password Reset Code
// @route   POST /api/auth/verify-reset-code
// @access  Public
exports.verifyResetCode = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    // Find user by email and verification code
    const user = await User.findOne({
      email,
      resetPasswordToken: verificationCode,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Verification code is valid',
    });
  } catch (error) {
    console.error('Verify reset code error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying code',
      error: error.message,
    });
  }
};

// @desc    Reset Password with verification code
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { email, verificationCode, password } = req.body;

    // Find user by email and verification code
    const user = await User.findOne({
      email,
      resetPasswordToken: verificationCode,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code',
      });
    }

    // Set new password
    user.password = password;

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password',
      error: error.message,
    });
  }
};