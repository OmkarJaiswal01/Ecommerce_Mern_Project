const mongoose=require('mongoose');
const UserRegister=mongoose.model("UserReg",new mongoose.Schema({
    UserName:{type:String,require:true},
UserEmail:{type:String,require:true},
MobileNo:{type:String,require:true},
UserPassword:{type:String,require:true},
UserConPassord:{type:String,require:true},
}))

module.exports= UserRegister;

