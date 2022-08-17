const Course = require("../models/course.model")


const addCourse = (req,res,next) => {
    let data = req.body;
    try{
        let course = new Course(data)
        course.save()
        res.json({
            status:true,
            result:course,
            msg:"Course Added Successfully"
        })

    } catch(error){
        next({msg:"Error adding Course"})
    }
}

const updateCourse = async (req,res,next) => {
    let data = req.body;
    try{
        let result = await Course.findByIdAndUpdate(req.params.id,{
            $set:data
        })
        res.json({status:true,msg:"Course Updated Successfully"})
    } catch(error){
        next({msg:"Error updating course"})
    }
}

const listCourses = async (req,res,next) => {
    try{
        let courses = await Course.find({}).populate('university')
        res.json({result:courses,msg:"Courses fetched successfully"})

    } catch(error){
        next({msg:"Error showing list of course"})
    }
}

const showCourse = async (req,res,next) => {
    try{
        let result = await Course.findById(req.params.id).populate('university')
        res.json({result:result,status:true,msg:"Course fetched successfully"})
    }catch(error){
        next({msg:"Error fetching course"})
    }
}

const deleteCourse = async (req,res,next)=>{
    try{
        let result = await Course.findByIdAndDelete(req.params.id)
        res.json({result:result,status:true,msg:"Course Deleted Successfully"})

    } catch(error){
        next({msg:"Error deleting course"})
    }
}






module.exports = {addCourse,updateCourse,listCourses,showCourse,deleteCourse}