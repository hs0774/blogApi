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
   const blog = await Blog.findById(req.params.id).populate('author');
   const comment = await Comment.find({blog:req.params.id}).populate('author').exec();
//    console.log(comment)
   if(!blog){
    res.status(404).json({ error: 'No matching blog found' });
   }
   res.status(200).json({blog,comment})
})


//creator privileges 
exports.blogCreateGet = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
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
