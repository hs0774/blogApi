const express = require('express');
const router = express.Router();

// Controllers
const blogController = require("../controllers/blogController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");

// Version 1 routes
//home page route
router.get('/v1',blogController.index);

//consumer/user privileges 

//sign up FRONTEND1
router.get('/v1/signup',userController.signupGet);
router.post('/v1/signup',userController.signupPost);

//login 
//frontend1
router.get('/v1/login',userController.loginGet);
router.post('/v1/login',userController.loginPost);

//frontend2
router.get('/v1/creator/login',userController.loginGet);
router.post('/v1/creator/login',userController.creatorLoginPost);

//when user clicks on blog
router.get('/v1/blog/:id',blogController.blogItemGet);

//when user wants to cud comment
router.post('/v1/comment/create',commentController.commentCreatePost);

//router.put('/v1/comment/:id/update',commentController.commentUpdate);
router.delete('/v1/comment/:id/delete',commentController.commentDelete);

//when user clicks on creator might change to /creator
router.get('/v1/user/:id',userController.userdetailGet);

//when consumer wants creator privileges 
router.get('/v1/request',userController.creatorPrivilegeGet);
router.post('/v1/request',userController.creatorPrivilegePost);


//creator privileges 
//create blog can hide will redirect to user page and have hidden tag if applicable 
router.get('/v1/blog/create',blogController.blogCreateGet);
router.post('/v1/blog/create',blogController.blogCreatePost);

router.put('/v1/blog/:id/update',blogController.blogItemUpdate);
router.delete('/v1/blog/:id/delete',blogController.blogItemDelete);

router.get('/v1/admin/request',userController.adminPrivilegeGet);
router.post('/v1/admin/request',userController.adminPrivilegePost);

router.put('/v1/blog/:id/isVisible',blogController.blogHide);

//admin privileges 
router.put('/v1/user/:id',userController.adminPrivilegeUpdate);
router.delete('/v1/user/:id',userController.adminPrivilegeDelete);
router.get('/v1/admin/list',userController.adminListGet);

module.exports = router;
