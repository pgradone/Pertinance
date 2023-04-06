const mongoose = require('mongoose');

const fldSchema = new mongoose.Schema({
  field: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Fld', fldSchema);
