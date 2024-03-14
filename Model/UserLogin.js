const mongoose=require('mongoose');
const ULogin=mongoose.model("UserLog",new mongoose.Schema({
 UEmail:{type:String,require:true},
 UPassword:{type:String,require:true},
 
}))

module.exports= ULogin;

