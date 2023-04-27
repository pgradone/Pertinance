const express = require('express');
const router = express.Router();
const Kwd = require('../models/kwd');
const Fld = require('../models/fld');
const mongoose = require('mongoose');

// All KWDs Route
router.get('/', async (req, res) => {
  let query = Kwd.find().populate('fieldText');
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

// Show KeyWorD Route
router.get('/:id', (req, res) => {
  res.send('Show KeyWorD ' + req.params.id);
});

// Edit KeyWorD Route
router.get('/:id/edit', async (req, res) => {
  try {
    const kwd = await Kwd.findById(req.params.id);
    renderEditPage(res, kwd);
  } catch (error) {
    console.error(err);
    res.redirect('/');
  }
});

// Update KeyWorD Route
router.put('/:id', async (req, res) => {
  let kwd;
  try {
    kwd = await Kwd.findById(req.params.id);
    kwd.keyWord = req.body.keyWord;
    kwd.mainKeyword = req.body.mainKeyword;
    kwd.field = req.body.field;
    await kwd.save();
    res.redirect(`/kwds/${kwd.id}`);
  } catch {
    if (kwd != null) {
      renderEditPage(res, kwd, true);
    } else {
      redirect('/');
    }
  }
});

// Delete KeyWorD Route
router.delete('/:id', async (req, res) => {
  let kwd;
  try {
    kwd = await Kwd.findById(req.params.id);
    await kwd.remove();
    res.redirect('/kwds');
  } catch {
    if (kwd != null) {
      res.render('kwds/show', {
        kwd: kwd,
        errorMessage: 'Could not remove keyWord',
      });
    } else {
      res.redirect('/');
    }
  }
});

async function renderNewPage(res, kwd, hasError = false) {
  renderFormPage(res, kwd, 'new', hasError);
}

async function renderEditPage(res, kwd, hasError = false) {
  renderFormPage(res, kwd, 'edit', hasError);
}

async function renderFormPage(res, kwd, form, hasError = false) {
  try {
    const flds = await Fld.find({});
    const mainKwds = await Kwd.find({ mainKeyword: null });
    const params = {
      flds: flds,
      kwds: mainKwds,
      kwd: kwd,
    };
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating keyword';
      } else {
        params.errorMessage = 'Error Creating keyword';
      }
    }
    res.render(`kwds/${form}`, params);
  } catch {
    res.redirect('/kwds');
  }
}

module.exports = router;
