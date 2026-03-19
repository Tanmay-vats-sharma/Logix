// controllers/teamResponseController.js
const TeamResponse = require("../../models/TeamResponse");
const Team = require("../../models/TeamModel");
const Registration = require("../../models/Registration");

const getSubmissions = async (req, res) => {
  try {
    const submissions = await TeamResponse.find().select(
      "submission timeTaken correctSubmission wpm accuracy typos completion precision typedChars startTime endTime textToType userInput team _id"
    ).lean();

    // Resolve team -> Team or Registration (student solo event)
    const formatted = await Promise.all(
      submissions.map(async (s) => {
        let teamName = null;
        let teamId = null;
        let rollNumbers = [];

        // Try Team first
        if (s.team) {
          const teamDoc = await Team.findById(s.team)
            .select("teamName teamId leader.rollNumber members.rollNumber")
            .lean();
          if (teamDoc) {
            teamName = teamDoc.teamName;
            teamId = teamDoc.teamId;
            rollNumbers = [
              teamDoc?.leader?.rollNumber,
              ...(teamDoc?.members || []).map((m) => m?.rollNumber),
            ].filter(Boolean);
          } else {
            // Fallback: maybe it's a Registration (solo student)
            const reg = await Registration.findById(s.team).select("name rollNumber").lean();
            if (reg) {
              teamName = reg.name;
              teamId = reg.rollNumber;
              rollNumbers = reg.rollNumber ? [reg.rollNumber] : [];
            }
          }
        }

        return {
          id: s._id,
          teamId,
          teamName,
          rollNumbers,
          submission: s.submission,
          timeTaken: s.timeTaken,
          correctSubmission: s.correctSubmission,
          wpm: s.wpm,
          accuracy: s.accuracy,
          typos: s.typos,
          completion: s.completion,
          precision: s.precision,
          typedChars: s.typedChars,
          startTime: s.startTime,
          endTime: s.endTime,
          textToType: s.textToType,
          userInput: s.userInput,
        };
      })
    );

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
