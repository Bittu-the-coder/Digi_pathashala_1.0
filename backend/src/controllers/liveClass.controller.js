const LiveClass = require('../models/liveClass.model');

// Create a new live class
exports.createLiveClass = async (req, res) => {
  try {
    const { title, course, subject, date, time, duration, meetingLink, instructor, instructorId } = req.body;

    // Combine date and time into a single Date object
    const dateTime = new Date(`${date}T${time}`);

    const liveClass = new LiveClass({
      title,
      course,
      subject,
      date: dateTime,
      duration,
      meetingLink,
      instructor,
      instructorId, // Store the instructor ID for filtering
    });

    await liveClass.save();
    res.status(201).json({ message: 'Live class scheduled successfully', liveClass });
  } catch (error) {
    res.status(400).json({ message: 'Error scheduling live class', error: error.message });
  }
};

// Get all live classes
exports.getLiveClasses = async (req, res) => {
  try {
    const { date, subject, course, instructorId } = req.query;
    let query = {};

    // Add date filter if provided
    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    // Add subject filter if provided
    if (subject && subject !== 'All Subjects') {
      query.subject = subject;
    }

    // Add course filter if provided
    if (course) {
      query.course = course;
    }

    // Add instructor filter if provided
    if (instructorId) {
      query.instructorId = instructorId;
    }

    const liveClasses = await LiveClass.find(query).sort({ date: 1 });
    res.status(200).json(liveClasses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching live classes', error: error.message });
  }
};

// Get a single live class by ID
exports.getLiveClassById = async (req, res) => {
  try {
    const liveClass = await LiveClass.findById(req.params.id);
    if (!liveClass) {
      return res.status(404).json({ message: 'Live class not found' });
    }
    res.status(200).json(liveClass);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching live class', error: error.message });
  }
};

// Update a live class
exports.updateLiveClass = async (req, res) => {
  try {
    const { title, course, subject, date, time, duration, meetingLink, instructor } = req.body;
    const dateTime = new Date(`${date}T${time}`);

    const liveClass = await LiveClass.findByIdAndUpdate(
      req.params.id,
      { title, course, subject, date: dateTime, duration, meetingLink, instructor },
      { new: true, runValidators: true }
    );

    if (!liveClass) {
      return res.status(404).json({ message: 'Live class not found' });
    }

    res.status(200).json({ message: 'Live class updated successfully', liveClass });
  } catch (error) {
    res.status(400).json({ message: 'Error updating live class', error: error.message });
  }
};

// Delete a live class
exports.deleteLiveClass = async (req, res) => {
  try {
    const liveClass = await LiveClass.findByIdAndDelete(req.params.id);
    if (!liveClass) {
      return res.status(404).json({ message: 'Live class not found' });
    }
    res.status(200).json({ message: 'Live class cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling live class', error: error.message });
  }
};