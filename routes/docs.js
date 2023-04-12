const express = require('express');
const router = express.Router();
const Doc = require('../models/doc');

// All DOCs route
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.docName != null && req.query.docName !== '') {
    searchOptions.docName = new RegExp(req.query.docName, 'i');
  }
  try {
    const docs = await Doc.find(searchOptions);
    res.render('docs/index', { docs: docs, searchOptions: req.query });
  } catch {
    res.redirect('/');
  }
});

// New DOCs route
router.get('/new', (req, res) => {
  res.render('docs/new', { doc: new Doc() });
});

// Create DOC Route
router.post('/', async (req, res) => {
  const doc = new Doc({
    docName: req.body.docName,
    docText: req.body.docText,
  });
  try {
    const newDoc = await doc.save();
    // res.redirect(`docs/${newDoc.id}`);
    res.redirect(`docs`);
  } catch {
    res.render('docs/new', {
      doc: doc,
      errorMessage: 'Error creating DOCument',
    });
  }
});
module.exports = router;
