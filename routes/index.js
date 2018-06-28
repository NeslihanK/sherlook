const express = require('express');
const router  = express.Router();
const Found = require("../models/Found");
const Lost = require("../models/Lost");
/*Middleware */
const uploadCloud = require("../config/cloudinary");
const Comment = require("../models/Comment");

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
  .then(foundDocs => {
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



router.get('/lost-list/:lostId', (req, res, next) => { 
  let lostId = req.params.lostId;
  Lost.findById(lostId)
  .populate({
    path: 'comments',
    model: 'Comment',
      populate:{
        path: 'author',
        model: 'User'
      },
  })
  .then (lostObject => {
    console.log(lostObject)
  res.render('lost-details', lostObject);
  })
 
  
});


router.post('/lost-list/:lostId', (req, res, next) => { 
  let lostId = req.params.lostId;
  let content = req.body.comment;
  let newComment = new Comment ({
    content,
    author: req.user
  })

  
    Lost.findByIdAndUpdate(lostId, { $push: {comments: newComment} } , {new: true})
    .then(() => {
      newComment.save()
      .then(()=>
    res.redirect(`/lost-list/${lostId}`)
  )
    }
  )
});


router.get('/found-list/:foundId', (req, res, next) => { 
  let foundId = req.params.foundId;
  Found.findById(foundId)
  .populate({
    path: 'comments',
    model: 'Comment',
      populate:{
        path: 'author',
        model: 'User'
      },
  })
  .then (foundObject => {
    console.log(foundObject)
  res.render('found-details', foundObject);
  })
 
  
});


router.post('/found-list/:foundId', (req, res, next) => { 
  let foundId = req.params.foundId;
  let content = req.body.comment;
  let newComment = new Comment ({
    content,
    author: req.user
  })

  
    Found.findByIdAndUpdate(foundId, { $push: {comments: newComment} } , {new: true})
    .then(() => {
      newComment.save()
      .then(()=>
    res.redirect(`/found-list/${foundId}`)
    )
    }
  )
});


module.exports = router;

