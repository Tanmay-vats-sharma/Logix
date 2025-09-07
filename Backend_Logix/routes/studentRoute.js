const express = require("express");
const { registerStudent, loginStudent } = require("../controllers/studentController");

const router = express.Router();

// Register Student
router.post("/register", registerStudent);

// Login Student (collegeEmail or personalEmail)
router.post("/login", loginStudent);

module.exports = router;
