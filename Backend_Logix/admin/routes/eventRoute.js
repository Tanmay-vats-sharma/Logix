const express = require('express');
const eventController = require('../controllers/eventController');
const { checkRole } = require('../../middlewares/auth');

const router = express.Router();

// Route to create a new event
router.use(checkRole(['superadmin']));
router.post('/create', eventController.createEvent);

module.exports = router;