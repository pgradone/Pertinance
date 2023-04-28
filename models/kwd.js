const mongoose = require('mongoose');

const kwdSchema = new mongoose.Schema({
  keyWord: {
    type: String,
    required: true,
    unique: true,
  },
  mainKeyword: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'Kwd',
  },
  fld: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Fld',
  },
});

kwdSchema.pre('remove', function (next) {
  const Kwd = mongoose.model('Kwd'); // This line is added
  Kwd.find({ mainKeyword: this._id }, (err, kwds) => {
    if (err) {
      next(err);
    } else if (kwds.length > 0) {
      next(
        new Error(
          'This keyWord is still being referenced somewhere else as mainKeyWord'
        )
      );
    } else {
      next();
    }
  });
});

kwdSchema.virtual('fieldText', {
  ref: 'Fld',
  localField: 'field',
  foreignField: 'kwd_id',
  justOne: false,
});

module.exports = mongoose.model('Kwd', kwdSchema);
