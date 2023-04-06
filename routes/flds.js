const express = require('express');
const router = express.Router();

// All FLDs Route
router.get('/', (req, res) => {
  res.render('flds/index');
});

//New FLDs Route
router.get('/new', (req, res) => {
  res.render('flds/new');
});

// Create FLD route
router.post('/', (req, res) => {
  res.send('Create FLD');
});

module.exports = router;
