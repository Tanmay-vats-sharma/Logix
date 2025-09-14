// controllers/teamResponseController.js
const TeamResponse = require("../../models/TeamResponse");

const getSubmissions = async (req, res) => {
  try {
    const submissions = await TeamResponse.find()
      .populate("team", "teamName teamId") // only team name and id
      .select("submission timeTaken correctSubmission _id"); // only include needed fields

    // Format response cleanly
    const formatted = submissions.map((s) => ({
      id: s._id,
      teamId: s.team?.teamId,
      teamName: s.team?.teamName,
      submission: s.submission,
      timeTaken: s.timeTaken,
      correctSubmission: s.correctSubmission,
    }));

    res.status(200).json({
      success: true,
      count: formatted.length,
      submissions: formatted,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
      error: err.message,
    });
  }
};

const updateCorrectSubmission = async (req, res) => {
  const { id } = req.params;
  const { correctSubmission } = req.body;

  try {
    const updated = await TeamResponse.findOneAndUpdate(
      { _id: id },
      { correctSubmission },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    res.status(200).json({
      success: true,
      submission: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update submission",
      error: err.message,
    });
  }
};

module.exports = {
  getSubmissions,
  updateCorrectSubmission,
};
