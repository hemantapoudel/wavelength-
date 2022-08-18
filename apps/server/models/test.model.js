const mongoose = require("mongoose")
const test = mongoose.Schema({
    title:{
        type:String
    },
    course:{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    },
    is_display:{
        type:Boolean,
        default:false
    },
    is_scheduled:{
        type:Boolean,
        default:false
    },
    is_negative_marking:{
        type:Boolean,
        default:false
    },
    start_time:{
        type:Date
    },
    end_time:{
        type:Date
    }

})
const Test = mongoose.model("Test",test);
module.exports=Test