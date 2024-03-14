const mongoose=require('mongoose');
const SelectAddDataModel=mongoose.model("Product",new mongoose.Schema({
 SubCategoryId:{type:String,require:true},
 ProductName:{type:String,require:true},
 Price:{type:String,require:true},
 Offer:{type:String,require:true},
 Pic:{type:String,require:true},
Des:{type:String,require:true},
}))

module.exports= SelectAddDataModel;

