const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String }],
});

const RoundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  questions: [QuestionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Round', RoundSchema);