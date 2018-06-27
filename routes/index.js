const express = require('express');
const router  = express.Router();
const Found = require('../models/found');
const Lost = require('../models/lost');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/lost-form", (req, res, next) => {
  res.render("lost-form");
});

router.post("/lost-form", (req, res, next) => {
  let {lostItem, imageURL, location, lostDate, desc }=req.body;
  let newLost = new Lost({
    lostItem,
    imageURL,
    location,
    lostDate,
    desc
  });
   
  newLost.save((err) => {
    if (err) {
      res.render("lost-form", { message: "Something went wrong" });
    } else {
      res.redirect("/");
    }
  });
}); 

module.exports = router;

