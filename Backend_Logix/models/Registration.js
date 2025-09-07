// const mongoose = require("mongoose");

// const teamMemberSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Team member name is required"],
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true, "Team member email is required"],
//     match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//   },
// });

// // Main Registration Schema
// const registrationSchema = new mongoose.Schema(
//   {
//     // STEP 1: Personal Information
//     name: {
//       type: String,
//       required: [true, "Full name is required"],
//       trim: true,
//     },
//     branch: {
//       type: String,
//       required: [true, "Branch is required"],
//     },
//     rollNumber: {
//       type: String,
//       required: [true, "Roll number is required"],
//       unique: true,
//     },
//     phone: {
//       type: String,
//       required: [true, "Phone number is required"],
//       match: [/^[0-9+\-\s]{7,15}$/, "Please enter a valid phone number"],
//     },
//     email: {
//       type: String,
//       required: [true, "Personal email is required"],
//       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//     },
//     collegeEmail: {
//       type: String,
//       required: [true, "College email is required"],
//       match: [/^\S+@\S+\.\S+$/, "Please enter a valid college email"],
//     },

//     // STEP 2: Participation Details
//     participantType: {
//       type: String,
//       enum: ["bidder", "presenter"],
//       required: [true, "Please select a participation type"],
//     },

//     // STEP 2.1: Presenter-specific fields
//     projectName: {
//       type: String,
//       required: function () {
//         return this.participantType === "presenter";
//       },
//       trim: true,
//     },
//     presentationFile: {
//       type: String, // We'll store file path or URL
//       required: function () {
//         return this.participantType === "presenter";
//       },
//     },
//     teamMembers: {
//       type: [teamMemberSchema],
//       validate: {
//         validator: function (members) {
//           // If presenter, must have at least 1 member and max 4
//           if (this.participantType === "presenter") {
//             return members.length >= 1 && members.length <= 4;
//           }
//           return true;
//         },
//         message: "Team members must be between 1 and 4",
//       },
//       default: [],
//     },

//     // STEP 3: Agreement & Invitations
//     agreeTerms: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true, // Automatically adds createdAt & updatedAt
//   }
// );

// const Registration = mongoose.model("Registration", registrationSchema);

// module.exports = Registration;


