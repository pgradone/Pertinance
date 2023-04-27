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

kwdSchema.pre('remove', function (next) {
  Kwd.find({ fld: this.mainKeyword }, (err, kwds) => {
    if (err) {
      next(err);
    } else if (kwds.length > 0) {
      next(new Error('This keyWord is still being referenced as mainKeyWord'));
    } else {
      next();
    }
  });
});

module.exports = mongoose.model('Kwd', kwdSchema);
