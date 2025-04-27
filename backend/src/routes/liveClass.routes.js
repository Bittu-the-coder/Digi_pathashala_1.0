const express = require('express');
const router = express.Router();
const liveClassController = require('../controllers/liveClass.controller');

// Create a new live class
router.post('/', liveClassController.createLiveClass);

// Get all live classes
router.get('/', liveClassController.getLiveClasses);

// Get a single live class by ID
router.get('/:id', liveClassController.getLiveClassById);

// Update a live class
router.put('/:id', liveClassController.updateLiveClass);

// Delete a live class
router.delete('/:id', liveClassController.deleteLiveClass);

module.exports = router;