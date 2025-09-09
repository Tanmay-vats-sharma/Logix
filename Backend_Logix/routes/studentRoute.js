const express = require("express");
const { registerTeam, loginTeam} = require("../controllers/studentController");

const router = express.Router();

// Register Team
router.post("/register", registerTeam);

// Login Team
router.post("/login", loginTeam);



module.exports = router;
