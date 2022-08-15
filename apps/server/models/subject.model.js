const mongoose = require("mongoose")
const subject = mongoose.Schema({
    title:{
        type:String
    },
    course:{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    }

})
const Subject = mongoose.model("Subject",subject);
module.exports=Subject