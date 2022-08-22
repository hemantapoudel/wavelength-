const mongoose = require("mongoose")
const subject = mongoose.Schema({
    title:{
        type:String
    },
    course:{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    },
    description:{
        type:String
    }

},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
})
const Subject = mongoose.model("Subject",subject);
module.exports=Subject