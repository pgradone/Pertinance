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
  res.send('Create DOC');
});

module.exports = router;
