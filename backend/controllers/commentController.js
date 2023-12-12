require("dotenv").config();
const Comment = require('../models/comment')
const Blog = require("../models/blog")
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");

// function AuthenticateToken(req,res,next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1];

//     if(!token) {
//         return res.status(401).json({message:'Unauthorized'});
//     }

//     jwt.verify(token, process.env.SECRET, (err,decodedToken) => {
//         if(err) {
//             return res.status(403).json({message: "Invalid token"});
//         }
//         req.user = decodedToken;
//         next();
//     });
// }

exports.commentCreatePost = [
    body('title',"Enter a proper title")
        .trim()
        .isLength({min:1,max:40})
        .escape(),
    body('message',"Enter a proper message")
        .trim()
        .isLength({min:1,max:230})
        .escape(),
    asyncHandler(async (req,res,next) => {
        const errors = validationResult(req);
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json({message:'Unauthorized'});
        }

        jwt.verify(token, process.env.SECRET, (err,decodedToken) => {
            if(err) {
                return res.status(403).json({message: "Invalid token"});
            }
            req.user = decodedToken;
            //next();
        });
        console.log(req.body,req.user)
        const user = await User.findOne({email:req.user.email})
        
        const newComment = new Comment({
            title:req.body.title,
            content:req.body.message,
            likes:0,
            dislikes:0,
            author: user._id,
            blog: req.body.blog, 
        })
        if(!errors.isEmpty()){
            res.json({error:"Something went wrong"})
        } else {
            newComment.save();
            newComment.author = await User.findById(user._id);
            res.status(200).json({newComment});
        }
      })
]

// exports.commentUpdate = asyncHandler(async (req,res,next) => {
//     res.json('message list coming soon');
// })

exports.commentDelete = asyncHandler(async (req,res,next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json({message:'Unauthorized'});
        }

        jwt.verify(token, process.env.SECRET, (err,decodedToken) => {
            if(err) {
            return res.status(403).json({message: "Invalid token"});
            }
            req.user = decodedToken;
        });

        console.log(req.user) // has email
        console.log(req.params.id) // has id of comment
        console.log(req.body) // has id of blog
        res.status(200).json({sucess:true});

        const user = await User.findOne({email:req.user.email});

        if(!user) {
            res.status(401).json({error:'Must be logged in'})
        }
        const comment = await Comment.findById(req.params.id);
        const blog = await Blog.findById(req.body.blogid)
        console.log(user._id.toString() === blog.author._id.toString())
        console.log(comment.author._id.toString() === user._id.toString());
        if((user._id.toString() === blog.author._id.toString()) || comment.author._id.toString() === user._id.toString()) {
            await Comment.deleteOne({_id:req.params.id})
            res.status(200).send();
        }
    } catch(error) {
        res.status(500).json({ message: 'Server error' });
    }   
})