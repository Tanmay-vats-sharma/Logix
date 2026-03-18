const TeamResponse = require('../models/TeamResponse');
const Event = require('../models/Event');

// Controller to increment submission count for the current team and latest event
exports.incrementSubmission = async (req, res) => {
  try {
    const teamId = req.user.id;

    // debug log the exact payload received from frontend
    console.log("Received Payload:", req.body);

    const latestEvent = await Event.findOne().sort({ createdAt: -1 });
    if (!latestEvent) {
      return res.status(404).json({ message: 'No event found.' });
    }

    const newSubmission = new TeamResponse({
      team: teamId,
      event: latestEvent._id,

      submission: 1,

      // 🔥 store EXACT frontend values
      timeTaken: req.body.timeTaken,
      wpm: req.body.wpm,
      accuracy: req.body.accuracy,
      typos: req.body.typos,

      // optional but IMPORTANT
      completion: req.body.completion,
      precision: req.body.precision,
      typedChars: req.body.typedChars,

      startTime: req.body.startTime,
      endTime: req.body.endTime,

      textToType: req.body.textToType,
      userInput: req.body.userInput,
    });

    await newSubmission.save();

    res.json({
      message: 'Submission saved correctly.',
      newSubmission
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};