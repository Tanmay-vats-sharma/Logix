const mongoose = require('mongoose');

const TeamResponseSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  round: { type: mongoose.Schema.Types.ObjectId, ref: 'Round', required: true },
  question: { type: String, required: true }, // or ObjectId if you want
  answer: { type: String },
  timeTaken: { type: Number, required: true }, // in milliseconds
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TeamResponse', TeamResponseSchema);