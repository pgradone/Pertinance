const express = require('express');
const router = express.Router();
const Kwd = require('../models/kwd');
const Fld = require('../models/fld');
const mongoose = require('mongoose');

// All KWDs Route
router.get('/', async (req, res) => {
  // let searchOptions = {};
  let query = Kwd.find();
  if (req.query.keyWord != null && req.query.keyWord !== '') {
    query = query.regex('keyWord', new RegExp(req.query.keyWord, 'i'));
  }
  if (req.query.mainKeyword != null && req.query.mainKeyword !== '') {
    query = query.regex('mainKeyword', new RegExp(req.query.mainKeyword, 'i'));
  }
  if (req.query.field != null && req.query.field !== '') {
    query = query.req.query.field;
    console.log(req.query.field + ' -> search not yet implemented!');
  }
  // console.log(query);
  try {
    const kwds = await query.exec();
    res.render('kwds/index', { kwds: kwds, searchOptions: req.query });
  } catch (err) {
    console.error(err);
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
  try {
    const newKwd = await kwd.save();
    res.redirect(`kwds/${newKwd.id}`);
  } catch {
    renderNewPage(res, kwd, true);
  }
});

// Show KeyWorD
router.get('/:id', (req, res) => {
  res.send('Show KeyWorD ' + req.params.id);
});

// Edit KeyWorD
router.get('/:id/edit', async (req, res) => {
  try {
    const kwd = await Kwd.findById(req.params.id);
    res.render('kwds/edit', { kwd: kwd });
  } catch (error) {
    console.error(err);
    res.redirect('/kwds');
  }
  res.send('Edit KeyWorD ' + req.params.id);
});

// Update KeyWorD
router.put('/:id', async (req, res) => {
  let kwd;
  try {
    kwd = await Kwd.findById(req.params.id);
    kwd.keyWord = req.body.keyWord;
    kwd.mainKeyword = req.body.mainKeyword;
    kwd.field = req.body.field;
  } catch {
    if (kwd == null) {
      res.redirect('/');
    } else {
      res.render('/kwds/edit', {
        kwd: kwd,
        errorMessage: 'Error updating KeyWorD',
      });
    }
  }
});

// Delete KeyWorD
router.delete('/:id', async (req, res) => {
  let kwd;
  try {
    kwd = await Kwd.findById(req.params.id);
    await kwd.remove();
  } catch {
    if (kwd == null) {
      res.redirect('/kwds');
    } else {
      res.redirect(`/kwds/${kwd.id}`);
    }
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
