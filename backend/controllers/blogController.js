const Blog = require("../models/blog")
const User = require('../models/users')
const Comment = require('../models/comment')
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");


// //when user clicks on blog
exports.index = asyncHandler(async (req,res,next) => {
    const blogs = await Blog.find().limit(3).exec();
    res.json(blogs);
})

exports.blogCreateGet = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.blogItemGet = asyncHandler(async (req,res,next) => {
    res.json('single item blog coming soon')
})
exports.blogCreatePost = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.blogItemUpdate = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.blogItemDelete = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

//creator privileges 
//create blog can hide will redirect to user page and have hidden tag if applicable 
// router.get('/v1/blog/create',blogController.blogCreateGet);
// router.post('/v1/blog/create',blogController.blogCreatePost);

// router.put('/v1/blog/:id/update',blogController.blogItemUpdate);
// router.delete('/v1/blog/:id/delete',blogController.blogItemDelete);