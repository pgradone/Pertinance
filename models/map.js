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
});

module.exports = mongoose.model('Map', fldSchema);
