const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  Id_Doc: {
    type: Number,
    required: false,
  },
  docName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const regex = new RegExp('^' + v + '$', 'i');
        return this.constructor
          .findOne({ docName: regex })
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
  docText: {
    type: String,
    required: false,
  },
  docElement: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Doc', docSchema);
