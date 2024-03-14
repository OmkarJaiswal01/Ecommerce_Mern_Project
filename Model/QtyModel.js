const mongoose=require('mongoose');
const QtyModel=mongoose.model("QtyUpdate",new mongoose.Schema({
 
 Qty:{type:String,require:true},
 
}))

module.exports= QtyModel;

