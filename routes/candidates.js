const express = require('express');
const router = express.Router();
const { Candi, Candidate } = require('../models/candidate');

// All Candi Route (index)
router.get('/', async (req, res) => {
  let searchOptions = {};
  for (const [key, value] of Object.entries(req.query)) {
    if (key === 'injectUrl') {
      continue;
    }
    if (value && value.trim() !== '') {
      searchOptions[key] = value;
    }
  }
  try {
    const candidates = await Candi.find(searchOptions);
    res.render('candidates/index', {
      candidates: candidates,
      searchOptions: req.query,
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Show Candi route
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candi.findById(req.params.id);
    // find all keywords matching this candidate's skills
    // and build a list of the corresponding mainKeywords
    // const kwds = await Candidate.matchedKwds(req.params.id);
    const kwds = await Candi.matchedMainKwds(req.params.id);
    res.render('candidates/show', {
      candidate: candidate,
      matchedKwds: kwds,
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

const checkContentType = (req, res, next) => {
  const contentType = req.headers['content-type'];
  if (
    contentType &&
    (contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data'))
  ) {
    next();
  } else {
    res.status(400).send('Bad Request: Invalid Content-Type header');
  }
};

// Inject Candidates Route
router.post('/inject', checkContentType, async (req, res) => {
  console.log(req.query);
  let searchOptions = {};
  for (const [key, value] of Object.entries(req.query)) {
    if (value && value.trim() !== '') {
      searchOptions[key] = value;
    }
  }
  try {
    const candidates = await Candi.find(searchOptions);
    await Candidate.injectInMongoDB(candidates);
    res.send(
      candidates.length + ' candidates have been injected into MongoDB!'
    );
  } catch (err) {
    console.log(err.stack);
    res.status(500).send('Error injecting candidates into MongoDB!');
  }
});

module.exports = router;
