const express = require('express');
const router  = express.Router();
const Found = require("../models/Found");
const Lost = require("../models/Lost");
/*MIddelware */
const uploadCloud = require("../config/cloudinary");

/* GET home page */
router.get('/', (req, res, next) => {
  user=req.user;
  res.render('index', {user});
});

/* Go to lost form */
router.get("/lost-form", (req, res, next) => {
  res.render("lost-form");
});

router.post("/lost-form", uploadCloud.single("image"),(req, res, next) => {
  let {category, lostItem, location, lostDate, reward, desc}=req.body;
  let image = req.file.url;
  let newLost = new Lost({
    category,
    lostItem,
    image,
    location,
    lostDate,
    reward,
    desc,
    _user:req.user
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

router.post("/found-form", uploadCloud.single("image"), (req, res, next) => {
  let {category, foundItem, location, foundDate, desc,}=req.body;
  let image = req.file.url;
  let newFound = new Found({
    category,
    foundItem,
    image,
    location,
    foundDate,
    desc,
    _user:req.user
  });
   
  newFound.save((err) => {
    if (err) {
      res.render("found-form", { message: "Something went wrong" });
    } else {
      res.redirect("/");
    }
  });
}); 

router.get('/lost-list', (req, res, next) => {
  Lost.find()
  .then((lostDocs) => {
    let data = {
      losts: lostDocs
    };
    res.render('lost-list', data);
  })
  .catch(err => {throw err})
});

router.get('/found-list', (req, res, next) => {
  Found.find()
  .then((foundDocs) => {
    let data = {
      founds: foundDocs
    };
    res.render('found-list', data);
  })
  .catch(err => {throw err})
});

router.get('/profile', (req, res, next) => {
  
  res.render('profile');
});

module.exports = router;

