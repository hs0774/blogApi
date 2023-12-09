require("dotenv").config();
const User = require('../models/users')
const Blog = require("../models/blog")
const Comment = require('../models/comment')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");

//reusable token generator function
const createToken = (email) => {
    return jwt.sign({email:email},process.env.SECRET)
}

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
            const token = createToken(req.body.email)
            res.status(200).json({token,username:req.body.username,email:req.body.email})
        }
    })       

]

exports.loginGet = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.loginPost = asyncHandler(async (req, res, next) => {
    const userInfo = await User.findOne({ email: req.body.email });
  
    if (!userInfo) {
      console.log("no such user exists");
      return res.status(401).json({ success: false, error: 'Invalid email' });
    }
  
    const matchingPassword = await bcrypt.compare(req.body.password, userInfo.password);
  
    if (!matchingPassword) {
      return res.status(401).json({ success: false, error: 'Invalid password' });
    }
  
    const token = createToken(req.body.email);
    res.status(200).json({ success: true, message: 'Login successful', token, username: userInfo.username, email: req.body.email });
  });
  

exports.userdetailGet = asyncHandler(async (req,res,next) => {
    const [user, blogs] = await Promise.all([
        User.findById(req.params.id),
        Blog.find({ author: req.params.id }),
    ]);
    
    if(!user){
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({user,blogs})
})

exports.creatorLoginPost = asyncHandler(async (req,res,next) => {
    const userInfo = await User.findOne({email:req.body.email})
    console.log(userInfo,userInfo.role)
    if(!userInfo || userInfo.role != 'creator'){
        console.log("no such user exists")
        return res.status(401).json({ error: 'Invalid email' });
        
    }
    const matchingPassword = await bcrypt.compare(req.body.password,userInfo.password);
    if(!matchingPassword){
        return res.status(401).json({ error: 'Invalid password' });
    }
    const token = createToken(req.body.email)
    res.status(200).json({ success: true, message: 'Login successful',token,username:userInfo.username,email:req.body.email });
})

///consumers can ask to be creators and post blogs 
exports.creatorPrivilegeGet = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.creatorPrivilegePost = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})


//creators can request to be admins 
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

