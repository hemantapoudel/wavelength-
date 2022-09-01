const Course = require("../models/course.model")
const Log = require("../models/activity_log.model")

const addCourse = (req,res,next) => {
    let data = req.body;
    try{
        let course = new Course(data)
        course.save()
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} added a course with id ${course.id}`,action:"create",ip:req.ip}
        let log=new Log(log_data)
        log.save()
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
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} updated a course with id ${result.id}`,action:"update",ip:req.ip}
        let log=new Log(log_data)
        log.save()
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
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} deleted a course with id ${result.id}`,action:"delete",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({result:result,status:true,msg:"Course Deleted Successfully"})

    } catch(error){
        next({msg:"Error deleting course"})
    }
}






module.exports = {addCourse,updateCourse,listCourses,showCourse,deleteCourse}