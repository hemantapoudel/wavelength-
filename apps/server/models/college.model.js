const mongoose = require("mongoose")
const college=mongoose.Schema({
    title:{
        type:String,
    },
    university:{
        type:String     
    },
    slug:{
        type:String,
    },
    meta_description:{
        type:String
    },
    meta_keywords:{
        type:String,
    },
    cover_pic:{
        type:String,
    },
    profile_pic:{
        type:String,
    },
    courses:{
        type:String,
    },
    location:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    type:{
        type:String,
    },
    description:{
        type:String,
    },
    rating:{
        type:String,
    },
    admission_process:{
        type:String,
    },
    views_count:{
        type:String,
    },
    

},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
});

const College=mongoose.model("College",college);
module.exports=College;