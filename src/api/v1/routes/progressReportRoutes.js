const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const progressReportController = require('../controllers/progressReportController');

// Get overall progress report
router.get('/', auth, progressReportController.getProgressReport);

module.exports = router; 