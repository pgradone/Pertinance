const express = require('express');
const router = express.Router();
const Doc = require('../models/candidate');

// All candidates route
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.id != null && req.query.id !== '') {
    searchOptions.id = new req.query.id();
  }
  if (req.query.firstName != null && req.query.firstName !== '') {
    searchOptions.firstName = new RegExp(req.query.firstName, 'i');
  }
  if (req.query.lastName != null && req.query.lastName !== '') {
    searchOptions.lastName = new RegExp(req.query.lastName, 'i');
  }
  if (req.query.skills != null && req.query.skills !== '') {
    searchOptions.skills = new RegExp(req.query.skills, 'i');
  }
  if (req.query.title != null && req.query.title !== '') {
    searchOptions.title = new RegExp(req.query.title, 'i');
  }
  if (req.query.email1 != null && req.query.email1 !== '') {
    searchOptions.email1 = new RegExp(req.query.email1, 'i');
  }
  try {
    const candidates = await Candidate.find(searchOptions);
    res.render('candidates/index', {
      candidates: candidates,
      searchOptions: req.query,
    });
  } catch {
    res.redirect('/');
  }
});

module.exports = router;
