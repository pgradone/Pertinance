const express = require('express');
const router = express.Router();

// All KWDs Route
router.get('/', (req, res) => {
  res.render('kwds/index');
});

//New KWDs Route
router.get('/new', (req, res) => {
  res.render('kwds/new');
});

module.exports = router;
