const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const topicController = require('../controllers/topicController');

// Create a new topic
router.post('/', auth, topicController.createTopic);

// Get all topics
router.get('/', auth, topicController.getAllTopics);

// Get topic by ID
router.get('/:id', auth, topicController.getTopicById);

// Update topic
router.put('/:id', auth, topicController.updateTopic);

// Delete topic
router.delete('/:id', auth, topicController.deleteTopic);

// Add problem to topic
router.post('/:id/problems', auth, topicController.addProblemToTopic);

// Update problem status
router.put('/problems/:problemId/status', auth, topicController.updateProblemStatus);

module.exports = router;