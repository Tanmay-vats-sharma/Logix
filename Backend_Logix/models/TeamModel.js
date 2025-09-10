const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, trim: true },
  branch: { type: String, required: true },
  section: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  collegeEmail: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9._%+-]+@rkgit\.edu\.in$/, "Must be a valid RKGIT email"],
  },
  personalEmail: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
});

const teamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true, unique: true },
    leader: { type: memberSchema, required: true },
    members: {
      type: [memberSchema],
      validate: {
        validator: (arr) => arr.length <= 2,
        message: "A team can have at most 2 additional members",
      },
    },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
