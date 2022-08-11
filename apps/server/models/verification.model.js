const mongoose = require("mongoose")
const verifyCode=mongoose.Schema({
    verification_code:{
        type:String,
    },
    email:{
        type:String,   
    },
},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
});

const Verify=mongoose.model("verify",verifyCode);
module.exports=Verify;