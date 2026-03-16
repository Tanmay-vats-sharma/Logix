const express = require("express");
const { registerTeam, loginTeam, registerStudent, loginStudent } = require("../controllers/studentController");

const router = express.Router();

// Register Team
router.post("/register", registerTeam);

// Login Team
router.post("/login", loginTeam);

// Register Student (individual)
router.post("/register/student", registerStudent);

// Login Student (individual)
router.post("/login/student", loginStudent);



module.exports = router;
