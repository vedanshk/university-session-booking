const mongoose = require("mongoose");
const uuid = require("uuid"); // Import the uuid package

const deanSchema = new mongoose.Schema({
  university_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  available_sessions: [
    {
      session_id: { // Add a session_id field
        type: String,
        default: () => uuid.v4(), // Generate a random UUID for each session
      },
      date_time: {
        type: Date,
        required: true,
      },
      is_booked: {
        type: Boolean,
        default: false,
      },
    },
  ],
  booked_sessions: [
    {
      date_time: {
        type: Date,
        required: true,
      },
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    },
  ],
});

module.exports = mongoose.model("Dean", deanSchema);
