const express = require('express');
const router  = express.Router();
const Found = require("../models/Found");
const Lost = require("../models/Lost");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* Go to lost form */
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
   console.log("newLost is", newLost);
  
   newLost.save((err) => {
    if (err) {
      res.render("lost-form", { message: "Something went wrong" });
    } else {
      res.redirect("/");
    }
  });
}); 

/* Go to found form */
router.get("/found-form", (req, res, next) => {
  res.render("found-form");
});

router.post("/found-form", (req, res, next) => {
  let {foundItem, imageURL, location, foundDate, desc }=req.body;
  let newFound = new Found({
    foundItem,
    imageURL,
    location,
    foundDate,
    desc
  });
   
  newFound.save((err) => {
    if (err) {
      res.render("found-form", { message: "Something went wrong" });
    } else {
      res.redirect("/");
    }
  });
}); 


module.exports = router;

