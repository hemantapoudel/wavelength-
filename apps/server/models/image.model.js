const mongoose = require("mongoose")
const image = mongoose.Schema({
    title:{
        type:String
    },
    uploaded_by:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
})
const Image = mongoose.model("Image",image);
module.exports=Image