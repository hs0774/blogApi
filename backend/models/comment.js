const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    title:{type:String},
    content:{type:String,required:true,maxLength:230},
    likes:{type:Number},
    dislikes:{type:Number},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog' }, 
})

CommentSchema.virtual("url").get(function(){
    return `/api/v1/comments/${this._id}`
})

module.exports = mongoose.model("Comment",CommentSchema)