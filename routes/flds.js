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
  } catch {
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
    res.redirect(`flds`);
  } catch {
    res.render('flds/new', {
      fld: fld,
      errorMessage: 'Error creating FieLD',
    });
  }
});

module.exports = router;
