const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

// Route to get all students
router.get('/', studentController.getAllStudents);

module.exports = router;