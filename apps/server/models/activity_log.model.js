const mongoose = require("mongoose")
const log = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'    
    },
    message:{
        type:String
    },
    action:{
        type:String
    }

},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
})
const Log = mongoose.model("Log",log);
module.exports=Log