const mongoose = require("mongoose")
const { DateTime } = require("luxon");
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    likes:{type:Number},
    dislikes:{type:Number},
    timestamp:{type:Date,default:Date.now},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    toJSON: { virtuals: true } // Include virtuals when converting to JSON
});

BlogSchema.virtual("url").get(function(){
    return `/api/v1/blog/${this._id}`
})

BlogSchema.virtual("date").get(function () {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
  });

module.exports = mongoose.model("Blog",BlogSchema)