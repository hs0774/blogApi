const User = require('../models/users')
const Blog = require("../models/blog")
const Comment = require('../models/comment')
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");

exports.signupGet = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.signupPost = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.loginGet = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.loginPost = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.userdetailGet = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.creatorPrivilegeGet = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.creatorPrivilegePost = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.adminPrivilegeGet = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.adminPrivilegePost = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.adminPrivilegeUpdate = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.adminPrivilegeDelete = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.adminListGet = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

