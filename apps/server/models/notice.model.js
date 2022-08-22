const mongoose = require("mongoose")
const notice = mongoose.Schema({
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
    published_date:{
        type:Date
    }
},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
})
const Notice = mongoose.model("Notices",notice);
module.exports=Notice