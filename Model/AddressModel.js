const mongoose=require('mongoose');
const AddressModel=mongoose.model("Uaddress",new mongoose.Schema({
    Name:{type:String,require:true},
    Mob:{type:String,require:true},
    Address:{type:String,require:true},
    Pin:{type:String,require:true},
    Status:{type:String,require:true}

}))

module.exports= AddressModel;