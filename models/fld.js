const mongoose = require('mongoose');
const Kwd = require('../models/kwd');

const fldSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
  },
});

fldSchema.pre('remove', function (next) {
  Kwd.find({ fld: this.id }, (err, kwds) => {
    if (err) {
      next(err);
    } else if (kwds.length > 0) {
      next(new Error('This field still has keyWorDs referenced'));
    } else {
      next();
    }
  });
});

module.exports = mongoose.model('Fld', fldSchema);
