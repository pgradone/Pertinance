const express = require('express');
const router = express.Router();

const Kwd = require('../models/kwd');

router.get('/', async (req, res) => {
  //res.send('Hello World');

  let kwds;
  try {
    kwds = await Kwd.find().populate('mainKwd').exec();
  } catch (error) {
    kwds = [];
  }

  res.render('index', { kwds: kwds });
});

module.exports = router;
