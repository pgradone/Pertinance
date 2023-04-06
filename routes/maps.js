const express = require('express');
const router = express.Router();

// All MAPs route
router.get('/', (req, res) => {
  res.render('maps/index');
});

// New MAP route
router.get('/new', (req, res) => {
  res.render('maps/new');
});

// Create DOC route
router.post('/', (req, res) => {
  res.send('Create MAP');
});

module.exports = router;
