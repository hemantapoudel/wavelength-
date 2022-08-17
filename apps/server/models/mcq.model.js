const mongoose=require("mongoose")
const MCQSchema = new mongoose.Schema({
    test:{
        type:mongoose.Types.ObjectId,
        ref:"Test"
    },
    subject:{
        type:mongoose.Types.ObjectId,
        ref:"Subject"
    },
    question:{
        type:String,
    },
    A:{
        type:String,
    },
    B:{
        type:String,
    },
    C:{
        type:String,
    },
    D:{
        type:String,
    },
    solution:{
        type:String,
    },
    iscorrect:{
        type:String,
        enum:['A','B','C','D']
    }
    },
    {
        timestamps:true,
        autoIndex:true,
        autoCreate:true
    });
const MCQ=mongoose.model("MCQ",MCQSchema);
module.exports=MCQ;   

