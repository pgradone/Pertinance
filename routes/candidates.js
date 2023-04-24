const express = require('express');
const router = express.Router();
const { getCandidates } = require('../models/candidate');

router.get('/', async (req, res) => {
  try {
    const candidates = await getCandidates();
    res.render('candidates/index', { candidates });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
