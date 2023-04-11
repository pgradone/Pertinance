const express = require('express');
const router = express.Router();
const Doc = require('../models/doc');

// All DOCs route
router.get('/', async (req, res) => {
  try {
    const docs = await Doc.find({});
    res.render('docs/index', { docs: docs });
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
