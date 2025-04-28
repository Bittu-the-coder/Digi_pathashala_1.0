/* eslint-disable no-undef */
const mongoose = require('mongoose');
const User = require('../models/user.model');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// MongoDB connection URI
const mongoUri = process.env.MONGO_URI
// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Function to delete users matching a specific pattern
async function deleteStudentsByEmailPattern() {
  try {
    // Pattern for bulk-registered student emails (you may modify this as needed)
    const deletePattern = /@mmmut\.ac\.in$/i;

    // Find all users with this email pattern
    const users = await User.find({
      email: { $regex: deletePattern },
      role: 'student'
    });

    console.log(`Found ${users.length} bulk-registered students`);

    if (users.length === 0) {
      console.log('No bulk-registered students found to delete');
      process.exit(0);
    }

    // Print list of users to be deleted
    console.log('Users to be deleted:');
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email})`);
    });

    // Confirm deletion
    console.log('Deleting users...');

    // Delete all matching users
    const result = await User.deleteMany({
      email: { $regex: deletePattern },
      role: 'student'
    });

    console.log(`Successfully deleted ${result.deletedCount} bulk-registered students`);
    process.exit(0);
  } catch (error) {
    console.error('Error deleting users:', error);
    process.exit(1);
  }
}

// Run the delete function
deleteStudentsByEmailPattern();