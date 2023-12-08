const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema =  new Schema({
    firstname:{type:String,minLength:1,maxLength:40,required:true},
    lastname:{type:String,minLength:1,maxLength:40,required:true},
    username:{type:String,minLength:1,maxLength:40,required:true},
    email:{type:String,minLength:1,required:true},
    password:{type:String,minLength:1,required:true},
    role: { type: String, enum: ["consumer", "creator"], default: "consumer" },
    admin:{type:Boolean,default:false},
}, {
    toJSON: { virtuals: true }
});


UserSchema.virtual("url").get(function(){
    return `/api/v1/user/${this._id}`
})

UserSchema.virtual("fullname").get(function(){
    return `${this.firstname} ${this.lastname}`
})

module.exports = mongoose.model("User",UserSchema)