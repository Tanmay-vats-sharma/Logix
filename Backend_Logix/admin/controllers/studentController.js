const Team = require('../../models/TeamModel');
const Event = require('../../models/Event');
const Registration = require('../../models/Registration');

exports.getAllStudents = async (req, res) => {
  try {
    // Find the latest event
    const latestEvent = await Event.findOne().sort({ createdAt: -1 });

    // Get all teams registered for the latest event
    const teams = await Team.find({ event: latestEvent._id }).lean();

    // Collect all students in these teams
    let students = [];
    teams.forEach((team) => {
      if (Array.isArray(team.members)) students.push(...team.members);
      if (team.leader) students.push(team.leader);
    });

    // Get individual registrations for the latest event
    const registrations = await Registration.find({ event: latestEvent._id }).lean();

    // Combine team students and registrations
    const combined = [...students, ...registrations];

    // Deduplicate by rollNumber (prefer registrations when duplicate exists)
    const seen = new Map();
    // iterate registrations first to let them overwrite team data if same rollNumber
    registrations.forEach((r) => {
      if (r && r.rollNumber) seen.set(r.rollNumber.toString(), r);
    });
    students.forEach((s) => {
      if (s && s.rollNumber && !seen.has(s.rollNumber.toString())) {
        seen.set(s.rollNumber.toString(), s);
      }
    });

    const result = Array.from(seen.values());

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};