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
  if (req.query.field != null && req.query.field !== '') {
    searchOptions.field = new RegExp(req.query.field, 'i');
  }
  try {
    const kwds = await Kwd.find(searchOptions);
    res.render('kwds/index', { kwds: kwds, searchOptions: req.query });
  } catch {
    res.redirect('/');
  }
});

//New KWDs Route
router.get('/new', async (req, res) => {
  try {
    const kwds = await Kwd.find({});
    const flds = await Fld.find({});
    const kwd = new Kwd();
    res.render('kwds/new', {
      kwds: kwds,
      flds: flds,
      kwd: kwd,
    });
  } catch {
    res.redirect('/kwds');
  }
});

// Create KWD route
router.post('/', async (req, res) => {
  const kwd = new Kwd({
    keyWord: req.body.keyWord,
    mainKeyword: req.body.mainKeyword,
    field: req.body.field,
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
