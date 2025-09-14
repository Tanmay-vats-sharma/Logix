const express = require("express");
const submissionController = require("../controllers/submissionController");
const { checkRole } = require('../../middlewares/auth');

const router = express.Router();

router.use(checkRole(['superadmin']));
router.get("/submissions", submissionController.getSubmissions);
router.put("/submissions/:id", submissionController.updateCorrectSubmission);

module.exports = router;
