const mongoose = require("mongoose")
const verifyCode=mongoose.Schema({
    otp:{
        type:String,
    },
    phone:{
        type:String,   
    },
},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
});

const Verify=mongoose.model("phone_number_verify",verifyCode);
module.exports=Verify;