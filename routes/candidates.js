const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// All Candidates Route
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
    // query = searchOptions;
    // console.log(query);
    // searchOptions = { id: 79 };
    console.log(searchOptions);
    // const candidates = await query.exec();
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

// Show Candidate
router.get('/:id', (req, res) => {
  res.send('Show Document ' + req.params.id);
});

module.exports = router;
