const express = require('express');
const adminLoginRoutes = require("./routes/loginRoute");
const adminEventRoutes = require("./routes/eventRoute");
const adminTeamRoutes = require("./routes/teamRoute");
const adminStudentRoutes = require("./routes/studentRoute");
const adminRoundRoutes = require("./routes/roundRoute");

const {auth} = require("../middlewares/auth");

const router = express.Router();

router.use("/", adminLoginRoutes);

router.use(auth);
router.use("/events", adminEventRoutes);
router.use("/teams", adminTeamRoutes);
router.use("/students", adminStudentRoutes);
router.use("/rounds", adminRoundRoutes);


module.exports = router;