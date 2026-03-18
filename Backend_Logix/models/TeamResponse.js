const mongoose = require('mongoose');

const TeamResponseSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  submission: { type: Number, default: 0 },
  timeTaken: { type: Number, required: true },
  correctSubmission: { type: Number, default: 0 },
  wpm: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  typos: { type: Number, default: 0 },
  // exact frontend stats and metadata (store as received)
  completion: { type: Number, default: 0 },
  precision: { type: Number, default: 0 },
  typedChars: { type: Number, default: 0 },
  startTime: { type: Number },
  endTime: { type: Number },
  textToType: { type: String },
  userInput: { type: String },
});

module.exports = mongoose.model('TeamResponse', TeamResponseSchema);