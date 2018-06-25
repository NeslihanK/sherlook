const express = require('express');
const router  = express.Router();
const Found = require('../models/found');
const Lost = require('../models/lost');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
