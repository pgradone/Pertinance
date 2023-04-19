const mongoose = require('mongoose');
const Kwd = require('../models/kwd');
const Fld = require('../models/fld');

const fldSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Fld', fldSchema);
