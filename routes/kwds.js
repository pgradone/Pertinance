const { render } = require('ejs');
const express = require('express');
const router = express.Router();

// All kwd router
router.get('/', (req, res) => {
  res.render('kwds/index');
});

// New KeyWord route for form
router.get('/new'),
  (req, res) => {
    res.render('kwds/new');
  };

// Create keyword route
router.post('/', (req, res) => {
  res.send('Create');
});

module.exports = router;
