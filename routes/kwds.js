const express = require('express');
const router = express.Router();
const Kwd = require('../models/kwd');
const Fld = require('../models/fld');
const mongoose = require('mongoose');

// Search KeyWorDs
router.get('/', async (req, res) => {
  let query = Kwd.find();
  if (req.query.keyWord != null && req.query.keyWord !== '') {
    query = query.regex('keyWord', new RegExp(req.query.keyWord, 'i'));
  }
  if (req.query.fld != null && req.query.fld !== '') {
    query = query.where('fld').equals(req.query.fld);
  }
  try {
    const kwds = await query.populate('fld').populate('mainKwd').exec();
    const flds = await Fld.find();
    const params = {
      kwds: kwds,
      flds: flds,
      searchOptions: req.query,
    };
    res.render('kwds/index', params);
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
  const value = req.body.mainKwd;
  const realmainKwd = value
    ? mongoose.Types.ObjectId.isValid(value)
      ? mongoose.Types.ObjectId(value)
      : null
    : null;
  const kwd = new Kwd({
    keyWord: req.body.keyWord,
    mainKwd: realmainKwd,
    fld: req.body.fld,
  });
  try {
    const newKwd = await kwd.save();
    res.redirect(`kwds/${newKwd.id}`);
  } catch (e) {
    console.error(e);
    renderNewPage(res, kwd, true);
  }
});

// Show KeyWorD Route
router.get('/:id', async (req, res) => {
  try {
    const kwd = await Kwd.findById(req.params.id)
      .populate('fld')
      .populate('mainKwd')
      .exec();
    const kwds = await Kwd.find({ mainKwd: kwd.id }).limit(10).exec();
    res.render('kwds/show', { kwd: kwd, kwdsByMainKwd: kwds });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Edit KeyWorD Route
router.get('/:id/edit', async (req, res) => {
  try {
    const kwd = await Kwd.findById(req.params.id);
    renderEditPage(res, kwd);
  } catch (err) {
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
    kwd.mainKwd = req.body.mainKwd;
    kwd.fld = req.body.fld;
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
  } catch (err) {
    if (kwd == null) {
      res.redirect('/');
    } else {
      res.redirect(`/kwds/${kwd.id}`);
    }
  }
});

router.get('/import', (req, res) => {
  res.render('import'); // render a form for uploading CSV file
});

router.post('/import', (req, res) => {
  if (!req.files || !req.files.csv) {
    return res.status(400).send('No CSV file uploaded');
  }

  const csvData = req.files.csv.data.toString();
  Kwd.importCSV((err, docs) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error importing CSV data');
    } else {
      console.log(docs);
      res.redirect('/kwds');
    }
  });
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
    const mainKwds = await Kwd.find({ mainKwd: null });
    let mainKwd = await Kwd.findById(kwd.mainKwd).populate('mainKwd').exec();
    mainKwd = mainKwd ? mainKwd : null;
    const params = {
      flds: flds,
      kwds: mainKwds,
      kwd: kwd,
      mainKwd: mainKwd,
    };
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating keyword';
      } else {
        params.errorMessage = 'Error Creating keyword';
      }
    }
    res.render(`kwds/${form}`, params);
  } catch (e) {
    console.error(e);
    res.redirect('/kwds');
  }
}

module.exports = router;
