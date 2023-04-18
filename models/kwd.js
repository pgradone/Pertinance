const mongoose = require('mongoose');
const Kwd = require('./kwd');

const kwdSchema = new mongoose.Schema({
  keyWord: {
    type: String,
    required: true,
  },
  mainKeyWord: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Kwd',
  },
  field: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Fld',
  },
});

module.exports = mongoose.model('Kwd', kwdSchema);
