const Team = require('../../models/TeamModel');
const Event = require('../../models/Event');

exports.getAllStudents = async (req, res) => {
  try {
    // Find the latest event
    const latestEvent = await Event.findOne().sort({ createdAt: -1 });

    // Get all teams registered for the latest event
    const teams = await Team.find({ event: latestEvent._id })
    
    // Collect all students in these teams
    let students = [];
    teams.forEach(team => {
      students.push(...team.members);
      students.push(team.leader);
    });

    // Remove duplicates
    students = students.filter(
      (student, index, self) =>
        index === self.findIndex((s) => s._id.toString() === student._id.toString())
    );

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};