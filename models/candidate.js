const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  skills: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  email1: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Candidate', candidateSchema);
