const express = require('express');
const router = express.Router();

// Controllers
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
const contentController = require("../controllers/userController");

// Version 1 routes
//home page route
router.get('/v1/', (req, res, next) => {
  res.json({ "users": ["user1", "user2", "user3"] });
});

//consumer/user privileges 

//sign up 
router.get('/v1/signup',);
router.post('/v1/signup',);

//login
router.get('/v1/login',);
router.post('/v1/login',);

//when user clicks on blog
router.get('/v1/blog/:id',);

//when user wants to cud comment
router.post('/v1/comment/create');
router.put('/v1/comment/:id/update');
router.delete('/v1/comment/:id/delete');

//when user clicks on creator might change to /creator
router.get('/v1/user/:id');

//when consumer wants creator privileges 
router.get('/v1/request');
router.post('/v1/request');


//creator privileges 
//create blog can hide will redirect to user page and have hidden tag if applicable 
router.get('/v1/blog/create');
router.post('/v1/blog/create');

router.put('/v1/blog/:id/update');
router.delete('/v1/blog/:id/delete');

router.get('/v1/admin/request');
router.post('/v1/admin/request');


//admin privileges 
router.put('/v1/user/:id');
router.delete('/v1/user/:id');
router.get('/v1/admin/list');

module.exports = router;
