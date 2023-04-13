const mongoose = require('mongoose');

const fldSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Fld', fldSchema);
