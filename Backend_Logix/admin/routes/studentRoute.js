const express = require('express');
const studentController = require('../controllers/studentController');
const { checkRole } = require('../../middlewares/auth');

const router = express.Router();

// Route to get all students
router.use(checkRole(['admin','superadmin']));
router.get('/', studentController.getAllStudents);

module.exports = router;