const mongoose= require("mongoose")

const cartSchema= new mongoose.Schema({
   
        Title:String,
        Author:String,
        Image:String,
        Price:Number,
        Category:String,
        Count:Number,

});

const Cart=mongoose.model("Cart",cartSchema);
module.exports=Cart;