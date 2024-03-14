const mongoose=require('mongoose');
const OrderDataModel=mongoose.model("Order",new mongoose.Schema({
 OrderDate:{type:String,require:true},
 Amount:{type:String,require:true},
 Address:{type:String,require:true},
 UserId:{type:String,require:true},
 Status:{type:String,require:true}


 
}))

module.exports= OrderDataModel;

