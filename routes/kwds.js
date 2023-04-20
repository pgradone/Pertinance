const express = require('express');
const router = express.Router();
const Kwd = require('../models/kwd');
const Fld = require('../models/fld');
const mongoose = require('mongoose');

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
  renderNewPage(res, new Kwd());
});

// Create KWD route
router.post('/', async (req, res) => {
  const value = req.body.mainKeyword;
  const realmainKeyWord = value
    ? mongoose.Types.ObjectId.isValid(value)
      ? mongoose.Types.ObjectId(value)
      : null
    : null;
  const kwd = new Kwd({
    keyWord: req.body.keyWord,
    mainKeyword: realmainKeyWord,
    field: req.body.field,
  });
  console.log(req.body.keyWord);
  console.log(req.body.mainKeyword);
  console.log(req.body.field);
  try {
    const newKwd = await kwd.save();
    // res.redirect(`kwds/${newKwd.id}`);
    res.redirect(`kwds`);
  } catch {
    renderNewPage(res, kwd, true);
  }
});

async function renderNewPage(res, kwd, hasError = false) {
  try {
    const flds = await Fld.find({});
    // make sure that the keyWords to choose from
    // are only those having mainKeyword empty
    const kwds = await Kwd.find({ mainKeyword: null });
    const params = {
      kwds: kwds,
      flds: flds,
      kwd: kwd,
    };
    if (hasError) params.errorMessage = 'Error creating Keyword';
    res.render('kwds/new', params);
  } catch {
    res.redirect('/kwds');
  }
}

module.exports = router;
