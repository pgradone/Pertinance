const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
  docAO: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doc',
    unique: true, // enforce uniqueness
  },
  docCV: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doc',
    unique: true, // enforce uniqueness
  },
  fld: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Fld',
    unique: true, // enforce uniqueness
  },
  wordCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

// ensure compound index
pertiSchema.index({ docAO: 1, docCV: 1, fld: 1 }, { unique: true });

module.exports = mongoose.model('Perti', pertiSchema);
