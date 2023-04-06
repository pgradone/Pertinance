const express = require('express');
const router = express.Router();

// All DOCs route
router.get('/', (req, res) => {
  res.render('docs/index');
});

// New DOCs route
router.get('/new', (req, res) => {
  res.render('docs/new');
});

// Create DOC route
router.post('/', (req, res) => {
  res.send('Create DOC');
});

module.exports = router;
