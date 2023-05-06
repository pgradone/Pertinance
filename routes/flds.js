const express = require('express');
const router = express.Router();
const Fld = require('../models/fld');
const Kwd = require('../models/kwd');

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

// Show FieLD route
router.get('/:id', async (req, res) => {
  try {
    const fld = await Fld.findById(req.params.id);
    const kwds = await Kwd.find({ fld: fld.id })
      .populate('mainKwd')
      .limit(10)
      .exec();
    res.render('flds/show', {
      fld: fld,
      kwdsByFld: kwds,
    });
  } catch (err) {
    // console.error(err);
    res.redirect('/');
  }
});

// Edit FieLD route
router.get('/:id/edit', async (req, res) => {
  try {
    const fld = await Fld.findById(req.params.id);
    res.render('flds/edit', { fld: fld });
  } catch (err) {
    console.error(err);
    res.redirect('/flds');
  }
});

// Update FieLD route
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
      res.render('/flds/edit', {
        fld: fld,
        errorMessage: 'Error updating FieLD',
      });
    }
  }
});

// Delete FieLD route
router.delete('/:id', async (req, res) => {
  let fld;
  try {
    fld = await Fld.findById(req.params.id);
    await fld.remove();
    res.redirect('/flds');
  } catch (err) {
    if (fld != null) {
      res.render('flds/show', {
        fld: fld,
        errorMessage: 'Could not remove field ' + err,
      });
    } else {
      res.redirect('/');
    }
  }
});

module.exports = router;
