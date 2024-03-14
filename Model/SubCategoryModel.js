const mongoose=require('mongoose');
const SubCatDataModal=mongoose.model("SubCategory",new mongoose.Schema({
    SubCategory:{type:String,require:true},
    CategoryId:{type:String,require:true},
}))

module.exports= SubCatDataModal;

