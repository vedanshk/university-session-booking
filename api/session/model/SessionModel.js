const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  dean: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dean',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  // Store date and time as Date objects
  dateTime: {
    type: Date,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
