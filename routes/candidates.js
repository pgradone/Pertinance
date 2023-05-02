const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const Kwd = require('../models/kwd');

// All Candidates Route (index)
router.get('/', async (req, res) => {
  let searchOptions = {};
  // let query = Candidate.find();
  if (req.query.id != null && req.query.id !== '') {
    searchOptions.id = req.query.id;
    // query = query.req.query.id;
  }
  if (req.query.firstName != null && req.query.firstName !== '') {
    // query = query.regex('firstName', new RegExp(req.query.firstName, 'i'));
    searchOptions.firstName = req.query.firstName;
  }
  if (req.query.lastName != null && req.query.lastName !== '') {
    // query = query.regex('lastName', new RegExp(req.query.lastName, 'i'));
    searchOptions.lastName = req.query.lastName;
  }
  if (req.query.title != null && req.query.title !== '') {
    // query = query.regex('title', new RegExp(req.query.title, 'i'));
    searchOptions.title = req.query.title;
  }
  if (req.query.email1 != null && req.query.email1 !== '') {
    // query = query.regex('email1', new RegExp(req.query.email1, 'i'));
    searchOptions.email1 = req.query.email1;
  }
  if (req.query.skills != null && req.query.skills !== '') {
    // query = query.regex('skills', new RegExp(req.query.skills, 'i'));
    searchOptions.skills = req.query.skills;
  }
  try {
    const candidates = await Candidate.find(searchOptions);
    res.render('candidates/index', {
      candidates: candidates,
      searchOptions: req.query,
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Show Candidate route
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    // find all keywords matching this candidate's skills
    // and build a list of the corresponding mainKeywords
    const kwds = await Candidate.matchedKwds(req.params.id);
    console.log(kwds);
    res.render('candidates/show', {
      candidate: candidate,
      matchedKwds: kwds,
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
