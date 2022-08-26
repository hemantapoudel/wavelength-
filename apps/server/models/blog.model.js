const mongoose = require("mongoose")
const blog = mongoose.Schema({
    title:{
        type:String
    },
    slug:{
        type:String
    },
    meta_description:{
        type:String
    },
    meta_keywords:{
        type:String
    },
    thumbnail:{
        type:String
    },
    full_description:{
        type:String
    },
    is_display:{
        type:Boolean,
        default:false
    },
    created_by:{
        type:String
    },
    updated_by:{
        type:Object
    }
},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
})
const Blog = mongoose.model("Blog",blog);
module.exports=Blog