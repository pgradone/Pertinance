const express = require('express');
const router = express.Router();
const Fld = require('../models/fld');

// All FLDs Route
router.get('/', async (req, res) => {
  let query = Fld.find();
  if (req.query.field != null && req.query.field != '') {
    query = query.regex('field', new RegExp(req.query.field, 'i'));
  }
  try {
    const flds = await query.exec();
    res.render('flds/index', { flds: flds, searchOptions: req.query });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

//New FLDs Route
router.get('/new', (req, res) => {
  res.render('flds/new', { fld: new Fld() });
});

// Create FLD route
router.post('/', async (req, res) => {
  const fld = new Fld({
    field: req.body.field,
  });
  try {
    const newFld = await fld.save();
    res.redirect(`flds/${newFld.id}`);
  } catch {
    res.render('flds/new', {
      fld: fld,
      errorMessage: 'Error creating FieLD',
    });
  }
});

// Show FieLD
router.get('/:id', (req, res) => {
  res.send('Show FieLD ' + req.params.id);
});

// Edit FieLD
router.get('/:id/edit', async (req, res) => {
  try {
    const fld = await Fld.findById(req.params.id);
    res.render('flds/edit', { fld: fld });
  } catch (err) {
    console.error(err);
    res.redirect('/fld');
  }
});

// Update FieLD
router.put('/:id', async (req, res) => {
  let fld;
  try {
    fld = await Fld.findById(req.params.id);
    fld.field = req.body.field;
    await fld.save();
    res.redirect(`/flds/${fld.id}`);
  } catch {
    if (fld == null) {
      res.redirect('/');
    } else {
      res.render('flds/edit', {
        fld: fld,
        errorMessage: 'Error updating FieLD',
      });
    }
  }
});

// Delete FieLD
router.delete('/:id', async (req, res) => {
  let fld;
  try {
    fld = await Fld.findById(req.params.id);
    await fld.remove();
    res.redirect('/flds');
  } catch {
    if (fld == null) {
      res.redirect('/');
    } else {
      res.redirect(`/flds/${fld.id}`);
    }
  }
});

module.exports = router;
