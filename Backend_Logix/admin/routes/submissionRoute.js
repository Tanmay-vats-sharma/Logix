const express = require("express");
const submissionController = require("../controllers/submissionController");

const router = express.Router();

router.get("/submissions", submissionController.getSubmissions);
router.put("/submissions/:id", submissionController.updateCorrectSubmission);

module.exports = router;
