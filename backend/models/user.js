const { required } = require("joi");
const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    fullname:{
        type:String,
        unique: true,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    

})

const User=mongoose.model("User",UserSchema);
module.exports=User;