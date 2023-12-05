const User = require('../models/users')
const Blog = require("../models/blog")
const Comment = require('../models/comment')
const bcrypt = require('bcryptjs')
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");

exports.signupGet = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.signupPost = [
    body('firstname', "Must be at least one letter long")
        .trim()
        .isLength({min:1,max:40})
        .escape(),
    body('lastname',"Must be at least one letter long") 
        .trim()
        .isLength({min:1,max:40})
        .escape(),  
    body('username',"Must be at least one letter long")
        .trim()
        .isLength({min:1,max:40})
        .escape(),   
    body('email')
        .isEmail()
        .withMessage('Invalid email format')  
        .normalizeEmail()
        .custom(async value => {
            const user = await User.findOne({email:value});
            if(user){
                throw new Error ("Email already in use")
            }
        }),
    body('password')  // add more security checks later
        .isLength({min:1}),
    body('Cpassword', "Passwords do not match")
        .custom((value,{req}) => {
            if(value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
    asyncHandler(async (req,res,next) => {
        const errors = validationResult(req);
        const hashword = await bcrypt.hash(req.body.password,10);

        const newUser = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            email:req.body.email,
            password:hashword,
        });

        if(!errors.isEmpty()){
            res.json({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            errors: errors.array(),
            })
            return; 
        } else {
            await newUser.save();
            res.redirect("/")
        }
    })       

]

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

