const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
  kwd: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Kwd',
  },
  doc: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doc',
  },
  wordCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('Map', fldSchema);
