const express = require('express');
const router = express.Router();
const Doc = require('../models/doc');

// All DOCs route
router.get('/', (req, res) => {
  res.render('docs/index');
});

// New DOCs route
router.get('/new', (req, res) => {
  res.render('docs/new', { doc: new Doc() });
});

// Create DOC Route
router.post('/', (req, res) => {
  const doc = new Doc({
    docName: req.body.name,
  });
  doc.save((err, newDoc) => {
    if (err) {
      res.render('docs/new', {
        doc: doc,
        errorMessage: 'Error creating DOCument',
      });
    } else {
      // res.redirect(`docs/${newDoc.id}`);
      res.redirect('docs');
    }
  });
});

module.exports = router;
