const Comment = require('../models/comment')
const Blog = require("../models/blog")
const User = require('../models/users')
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");


exports.commentCreatePost = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.commentUpdate = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.commentDelete = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})