const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// All candidates route
router.get('/', async (req, res) => {
  const candidates = await Candidate.find({});
  try {
    const kwds = await Candidate.find({});
    res.render('candidates/index', { candidates: candidates });
  } catch {
    res.redirect('/');
  }
});

// fetch(apiUrl)
// .then(express.response => express.response.json())
// .catch(error => console.log(error))
// }

module.exports = router;
