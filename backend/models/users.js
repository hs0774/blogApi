const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema =  new Schema({
    firstname:{type:String,minLength:1,maxLength:20,required:true},
    lastname:{type:String,minLength:1,maxLength:20,required:true},
    username:{type:String,minLength:1,maxLength:20,required:true},
    email:{type:String,minLength:1,maxLength:20,required:true},
    password:{type:String,minLength:1,maxLength:20,required:true},
    role: { type: String, enum: ["consumer", "creator"], default: "consumer" },
    admin:{type:Boolean,default:false},
})


UserSchema.virtual("url").get(function(){
    return `/api/users/${this._id}`
})

UserSchema.virtual("fullname").get(function(){
    return `${this.firstname} ${this.lastname}`
})
module.exports = mongoose.model("User",UserSchema)