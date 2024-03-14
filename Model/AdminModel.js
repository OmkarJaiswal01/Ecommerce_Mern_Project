const mongoose=require('mongoose');
const AdminModel=mongoose.model("admin",new mongoose.Schema({
    UserName:{type:String,require:true},
    Password:{type:String,require:true},
}))

module.exports= AdminModel;