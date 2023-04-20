const mongoose = require('mongoose');

const kwdSchema = new mongoose.Schema({
  keyWord: {
    type: String,
    required: true,
    unique: true,
  },
  mainKeyword: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'MainKwd',
  },
  field: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Fld',
  },
});

module.exports = mongoose.model('Kwd', kwdSchema);
