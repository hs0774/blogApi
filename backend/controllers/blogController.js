require("dotenv").config();
const Blog = require("../models/blog")
const User = require('../models/users')
const Comment = require('../models/comment')
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')


// //when user clicks on blog
exports.index = asyncHandler(async (req,res,next) => {
    const blogs = await Blog.find({isVisible:true}).limit(3).exec();
    //const blogs = await Blog.find().limit(3).exec();
    //const blogs = await Blog.find({isVisible:true}).sort({_id:-1}).limit(3).exec();
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

exports.blogCreatePost = [
    body('title')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Title cannot be empty')
        .escape(),
    body('content')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Content cannot be empty'),
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
        });
        console.log(req.body)
        const user = await User.findOne({email:req.user.email})
        //res.status(200).json({id:user._id})

        const newBlog = new Blog({
            title:req.body.title,
            content:req.body.content,
            likes:0,
            dislikes:0,
            author: user._id,
        })

        if(!errors.isEmpty()){
            res.json({error:"Something went wrong"})
        } else {
            newBlog.save();
            res.status(200).json({success:true,id:newBlog.id})
        }
    }),

]

exports.blogItemUpdate = asyncHandler(async (req,res,next) => {
    res.json('message list coming soon');
})

exports.blogItemDelete = asyncHandler(async (req,res,next) => {
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
    console.log(req.params.id) // has id of blog

    const [blog, user] = await Promise.all([
        Blog.findById(req.params.id),
        User.findOne({email:req.user.email})
    ]);

    if (!blog) {
        // Handle the case where the blog is not found
        return res.status(404).json({ message: "Blog not found" });
    }
    if(blog.author._id.toString() != user._id.toString()) {
        return res.status(401).json({ message: "Permission denied" });
    } 
    const comment = await Comment.find({blog:req.params.id})
    console.log(comment);
    await Blog.deleteOne({_id:req.params.id})
    await Comment.deleteMany({blog:req.params.id})  
    res.status(200).send();
})
exports.blogHide = asyncHandler(async (req,res,next) => {
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
        console.log(req.params.id) // has id of blog

        const [blogs, user] = await Promise.all([
            Blog.findById(req.params.id),
            User.findOne({email:req.user.email})
        ]);

        if (!blogs) {
            // Handle the case where the blog is not found
            return res.status(404).json({ message: "Blog not found" });
        }
        if(blogs.author._id.toString() != user._id.toString()) {
            return res.status(401).json({ message: "Permission denied" });
        } 
        blogs.isVisible = !blogs.isVisible;
        await blogs.save();
        res.status(200).json({updatedBlog:blogs});
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }       
})
