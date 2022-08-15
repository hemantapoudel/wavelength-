const mongoose = require("mongoose")
const course=mongoose.Schema({
    title:{
        type:String,
    }

},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
});

const Course=mongoose.model("Course",course);
module.exports=Course;