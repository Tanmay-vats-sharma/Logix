const express = require('express');
const submissionController = require('../controllers/submissionController');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Example route: adjust as needed
router.post('/submit', auth, submissionController.incrementSubmission);

module.exports = router;