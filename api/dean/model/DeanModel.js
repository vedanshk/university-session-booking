const mongoose = require('mongoose');

const deanSchema = new mongoose.Schema({
  university_id: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Dean = mongoose.model('Dean', deanSchema);

module.exports = Dean;
