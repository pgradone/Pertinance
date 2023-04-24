const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.render('candidates/index', { candidates });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
