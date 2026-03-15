const TeamResponse = require('../models/TeamResponse');
const Event = require('../models/Event');

// Controller to increment submission count for the current team and latest event
exports.incrementSubmission = async (req, res) => {
  try {
    const teamId = req.user.id;

    // Find the latest event (assuming latest by createdAt)
    const latestEvent = await Event.findOne().sort({ createdAt: -1 });
    if (!latestEvent) {
      return res.status(404).json({ message: 'No event found.' });
    }

    // Find the TeamResponse document or create if not exists
    let teamResponse = await TeamResponse.findOne({
      team: teamId,
      event: latestEvent._id,
    });

    if (!teamResponse) {
      teamResponse = new TeamResponse({
        team: teamId,
        event: latestEvent._id,
        submission: 1,
        timeTaken: req.body.timeTaken,
        wpm: req.body.wpm || 0,
        accuracy: req.body.accuracy || 0,
        typos: req.body.typos || 0,
      });
    } else {
      teamResponse.submission += 1;
      teamResponse.timeTaken += req.body.timeTaken;
      teamResponse.wpm = Math.max(teamResponse.wpm, req.body.wpm || 0);
      teamResponse.accuracy = Math.max(teamResponse.accuracy, req.body.accuracy || 0);
      teamResponse.typos = Math.min(teamResponse.typos, req.body.typos || 0); // lower typos is better
    }

    await teamResponse.save();

    res.json({ message: 'Submission incremented.', teamResponse });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};