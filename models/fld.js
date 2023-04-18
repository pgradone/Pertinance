const mongoose = require('mongoose');
const Kwd = require('./kwd');

const fldSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Fld', fldSchema);
