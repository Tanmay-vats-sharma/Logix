const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Route to create a new event
router.post('/create', eventController.createEvent);

module.exports = router;