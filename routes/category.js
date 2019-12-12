var express = require('express');
var router = express.Router();
var Category = require('../models/index.js').Category;
var MeetPost = require('../models/index.js').MeetPost;
var User = require('../models/index.js').User;
var Intropost = require('../models/index.js').Intropost;

router.get('/', (req, res, next) => {
    Category.findAll()
    .then((categories) => {
        res.json(categories);
    }).catch((err) => {
        console.error(err);
        next(err);
    });
});


// 카테고리별 글 리스트 페이지 렌더링
router.get('/categorylist', function(req,res,next) {
    res.render('categorypage');
});

router.get('/recategorylist', function(req,res,next) {
  res.render('recategorypage');
});

// 리스트 데이터 가져오기
router.get('/categorylist/:id', function(req,res,next) {
    MeetPost.findAll({
      include: [{ model: Category, }, { model: User}],
      where: {categoryId:req.params.id},
    //   order:[['id','DESC']] 
    })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
  });

// 리스트 데이터 가져오기(review)
router.get('/recategorylist/:id', function(req,res,next) {
  Intropost.findAll({
    include: [{ model: Category, }, { model: User}],
    where: {categoryId:req.params.id},
  })
  .then((reviews) => {
    res.json(reviews);
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });
});
  
module.exports = router;