const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String,},
  rollNumber: { type: String },
  branch: { type: String },
  section: { type: String },
  phoneNumber: {
    type: String,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  collegeEmail: {
    type: String,
    lowercase: true,
    match: [/^[a-zA-Z0-9._%+-]+@rkgit\.edu\.in$/, "Must be a valid RKGIT email"],
  },
  personalEmail: {
    type: String,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
});

const teamSchema = new mongoose.Schema(
  {
    teamId: { type: Number },
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

teamSchema.pre("save", async function (next) {
  if (this.isNew) {
    const Team = this.constructor;
    const lastTeam = await Team.findOne({ event: this.event })
      .sort({ teamId: -1 })
      .select("teamId")
      .lean();
    this.teamId = lastTeam && lastTeam.teamId ? lastTeam.teamId + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("Team", teamSchema);