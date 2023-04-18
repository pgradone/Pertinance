const express = require('express');
const router = express.Router();
const Kwd = require('../models/kwd');
const Fld = require('../models/fld');

// All KWDs Route
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.keyWord != null && req.query.keyWord !== '') {
    searchOptions.keyWord = new RegExp(req.query.keyWord, 'i');
  }
  if (req.query.mainKeyword != null && req.query.mainKeyword !== '') {
    searchOptions.mainKeyword = new RegExp(req.query.mainKeyword, 'i');
  }
  try {
    const kwds = await Kwd.find(searchOptions);
    res.render('kwds/index', { kwds: kwds, searchOptions: req.query });
  } catch {
    res.redirect('/');
  }
});

//New KWDs Route
router.get('/new', (req, res) => {
  res.render('kwds/new', { kwd: new Kwd() });
});

// Create KWD route
router.post('/', async (req, res) => {
  const kwd = new Kwd({
    keyWord: req.body.keyWord,
    mainKeyword: req.body.mainKeyword,
  });
  try {
    const newKwd = await kwd.save();
    res.redirect(`kwds`);
  } catch {
    res.render('kwds/new', {
      kwd: kwd,
      errorMessage: 'Error creating Keyword',
    });
  }
});

module.exports = router;
