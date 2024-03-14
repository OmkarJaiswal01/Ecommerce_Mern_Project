const mongoose=require('mongoose');
const DataModel=mongoose.model("Category",new mongoose.Schema({
 Category:{type:String,require:true},
 Pic:{type:String,require:true},
}))

module.exports=DataModel;

