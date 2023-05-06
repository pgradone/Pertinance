const mongoose = require('mongoose');
const Kwd = require('./kwd');

const fldSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const regex = new RegExp('^' + v + '$', 'i');
        return this.constructor
          .findOne({ field: regex })
          .then((doc) => {
            const isDuplicate = doc && this.id !== doc.id;
            return !isDuplicate;
          })
          .catch((err) => {
            throw err;
          });
      },
      message: (props) =>
        `The keyword "${props.value}" already exists in the database.`,
    },
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
