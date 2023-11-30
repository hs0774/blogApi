const mongoose = require("mongoose")

const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    likes:{type:Number},
    dislikes:{type:Number},
    timestamp:{type:Date,default:Date.now},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
})

BlogSchema.virtual("url").get(function(){
    return `/api/blog/${this._id}`
})

module.exports = mongoose.model("Blog",BlogSchema)