const mongoose = require("mongoose")
const course=mongoose.Schema({
    title:{
        type:String,
    },
    university:{
        type:mongoose.Types.ObjectId,
        ref:"University"
    },
    about:{
        type:String,
    },
    why_to_study:{
        type:String
    },
    objectives:{
        type:String,
    },
    eligibility:{
        type:String,
    },
    entrance_exam:{
        type:String,
    },
    admission:{
        type:String,
    },
    fee_structure:{
        type:String,
    },
    scope:{
        type:String,
    },
    after_course:{
        type:String,
    },
    syllabus:{
        type:String,
    }
},{
    timestamps:true,
    autoIndex:true,
    autoCreate:true
});

const Course=mongoose.model("Course",course);
module.exports=Course;