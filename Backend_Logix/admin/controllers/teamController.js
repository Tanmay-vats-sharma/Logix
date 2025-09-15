const Event = require('../../models/Event');
const Team = require('../../models/TeamModel');

// Get all registered teams
exports.getAllTeams = async (req, res) => {
  try {
    // Find the latest event (assuming createdAt field exists)
    const latestEvent = await Event.findOne().sort({ createdAt: -1 });

    if (!latestEvent) {
      return res.status(404).json({ message: 'No events found.' });
    }

    // Find teams registered for the latest event
    const teams = await Team.find({ event: latestEvent._id });

    res.status(200).json({
      event: latestEvent.name,
      teams,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a team by ID
exports.deleteTeam = async (req, res) => {
  const teamId = req.params.id;
  
  try {
    const team = await Team.findByIdAndDelete(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json({ message: 'Team deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};