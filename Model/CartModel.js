const mongoose=require('mongoose');
const CartModel=mongoose.model("Cart",new mongoose.Schema({
 Email:{type:String,require:true},
 ProductId:{type:String,require:true},
 Qty:{type:String,require:true},
 
 
}))

module.exports= CartModel;

