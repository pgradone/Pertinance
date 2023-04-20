const mongoose = require('mongoose');
const Kwd = require('./kwd');
const Fld = require('./fld');

const kwdSchema = new mongoose.Schema({
  keyWord: {
    type: String,
    required: true,
  },
  mainKeyWord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kwd',
  },
  field: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Fld',
  },
});

module.exports = mongoose.model('Kwd', kwdSchema);
