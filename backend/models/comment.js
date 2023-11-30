const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    title:{type:String},
    content:{type:String,required:true,minLength:3,maxLength:230},
    likes:{type:Number},
    dislikes:{type:Number},
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }, // Reference to the parent comment
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog' }, 
})


module.exports = mongoose.model("Comment",CommentSchema)