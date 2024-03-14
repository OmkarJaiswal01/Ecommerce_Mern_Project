const mongoose=require('mongoose');
const OrderDetails=mongoose.model("OrderDetails",new mongoose.Schema({
 OrderDate:{type:String,require:true},
 OrderId:{type:String,require:true},
 Qty:{type:String,require:true},
 


 
}))

module.exports= OrderDetails;

