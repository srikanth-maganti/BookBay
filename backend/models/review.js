const mongoose=require("mongoose");

const reviewSchema=new mongoose.Schema({
    
})

const reviews=mongoose.model("review",reviewSchema);
module.exports=reviews;