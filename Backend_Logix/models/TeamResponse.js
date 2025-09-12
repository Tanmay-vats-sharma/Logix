const mongoose = require('mongoose');

const TeamResponseSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  submission: { type: Number, default: 0 },
  timeTaken: { type: Number, required: true },
  correctSubmission: { type: Number, default: 0 },
});

module.exports = mongoose.model('TeamResponse', TeamResponseSchema);