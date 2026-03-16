const mongoose = require("mongoose");

// Individual (student) registration schema.
// This borrows identifying fields from the team member schema
// so an individual record contains the same canonical identifiers.
const individualSchema = new mongoose.Schema(
	{
		// Personal / identity fields
		name: { type: String, required: [true, "Full name is required"], trim: true },
		rollNumber: { type: String, required: [true, "Roll number is required"], unique: true, trim: true },
		branch: { type: String, required: [true, "Branch is required"] },
		year: {
			type: String,
			required: [true, "Year is required"],
			enum: ["1", "2", "3", "4"],
		},
		section: { type: String },

		// Contact
		phoneNumber: {
			type: String,
			required: [true, "Phone number is required"],
			match: [/^\d{10}$/, "Phone number must be 10 digits"],
		},
		collegeEmail: {
			type: String,
			lowercase: true,
			match: [/^[a-zA-Z0-9._%+-]+@rkgit\.edu\.in$/, "Must be a valid RKGIT email"],
		},
		personalEmail: {
			type: String,
			required: [true, "Personal email is required"],
			lowercase: true,
			match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
		},

		// Event / participation
		event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: false },
		participantType: { type: String, enum: ["individual", "team"], default: "individual" },

		// If the student later joins/is part of a team, reference it
		team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: false },
		teamId: { type: Number, required: false },

		// Agreement and metadata
		agreeTerms: { type: Boolean, default: false },
		identificationDocument: { type: String },
	},
	{ timestamps: true }
);

individualSchema.index({ personalEmail: 1 });

const Registration = mongoose.model("Registration", individualSchema);

module.exports = Registration;


