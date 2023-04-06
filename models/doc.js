const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  ID_DOC: {
    type: Number,
    required: true,
  },
  docName: {
    type: String,
    required: true,
  },
  docText: {
    type: String,
    required: true,
  },
  docElement: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Doc', docSchema);
