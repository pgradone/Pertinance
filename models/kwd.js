const mongoose = require('mongoose');

const kwdSchema = new mongoose.Schema({
  keyWord: {
    type: String,
    required: true,
    unique: true,
  },
  mainKwd: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kwd',
    default: null,
  },
  fld: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Fld',
  },
});

kwdSchema.pre('remove', function (next) {
  const Kwd = mongoose.model('Kwd'); // This line is added
  Kwd.find({ mainKwd: this._id }, (err, kwds) => {
    if (err) {
      next(err);
    } else if (kwds.length > 0) {
      next(
        new Error(
          'This keyWord is still being referenced somewhere else as main KeyWord'
        ),
        console.log(
          'This keyWord is still being referenced somewhere else as main KeyWord'
        )
      );
    } else {
      next();
    }
  });
});

module.exports = mongoose.model('Kwd', kwdSchema);
