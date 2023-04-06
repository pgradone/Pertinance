const mongoose = require('mongoose');

const kwdSchema = new mongoose.Schema({
  keyWord: {
    type: string,
    required: true,
  },
  mainKeyWord: {
    type: Object,
    required: false,
  },
});

module.exports = mongoose.model('Kwd', fldSchema);
