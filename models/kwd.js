const mongoose = require('mongoose');

const kwdSchema = new mongoose.Schema({
  keyWord: {
    type: String,
    required: true,
  },
  mainKeyWord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kwd',
  },
});

module.exports = mongoose.model('Kwd', kwdSchema);
