const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  university_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sessions: [
    {
      dean_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Dean', // Reference the Dean model
      },
      dateTime: Date,
      isBooked: Boolean,
    },
  ],
});

module.exports = mongoose.model('Student', studentSchema);
