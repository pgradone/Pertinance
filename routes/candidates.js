const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// All Candidates Route
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.id != null && req.query.id !== '') {
    searchOptions.id = req.query.id;
  }
  if (req.query.firstName != null && req.query.firstName !== '') {
    searchOptions.firstName = req.query.firstName;
  }
  if (req.query.lastName != null && req.query.lastName !== '') {
    searchOptions.lastName = req.query.lastName.toLowerCase;
  }
  if (req.query.title != null && req.query.title !== '') {
    searchOptions.title = req.query.title;
  }
  if (req.query.email1 != null && req.query.email1 !== '') {
    searchOptions.email1 = req.query.email1;
  }
  if (req.query.skills != null && req.query.skills !== '') {
    searchOptions.skills = req.query.skills;
  }
  try {
    console.log(searchOptions);
    // searchOptions = { firstName: 'Pierre' };
    // console.log(searchOptions);
    const candidates = await Candidate.find(searchOptions);
    // console.log(candidates);
    res.render('candidates/index', {
      candidates: candidates,
      searchOptions: req.query,
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
