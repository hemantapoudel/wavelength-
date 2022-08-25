const mongoose = require("mongoose")
const result = mongoose.Schema({
    test:{
        type:mongoose.Types.ObjectId,
        ref:'Test'
    },
    submitted_by:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    total_marks:{
        type:String
    },
    submitted_at:{
        type:Date,
        default:Date.now()

    }
},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
})
const Result = mongoose.model("Result",result);
module.exports=Result