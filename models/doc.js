const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  // ID_DOC: {
  //   type: Number,
  //   required: false,
  // },
  docName: {
    type: String,
    required: true,
  },
  // docText: {
  //   type: String,
  //   required: false,
  // },
  // docElement: {
  //   type: String,
  //   required: false,
  // },
});

module.exports = mongoose.model('Doc', docSchema);
