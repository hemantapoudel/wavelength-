const mongoose = require("mongoose")
const university=mongoose.Schema({
    title:{
        type:String,
    },
    profile_pic:{
        type:String,
    },
    cover_pic:{
        type:String,
    },
    description:{
        type:String,
    },
    location:{
        type:String,
    },

},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
});

const University=mongoose.model("University",university);
module.exports=University;