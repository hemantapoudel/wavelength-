const Course = require("../models/course.model")
const Subject = require("../models/subject.model")
const Log = require("../models/activity_log.model")

const addSubject = (req,res,next) => {
    let data =req.body;
    try{
        let subject = new Subject(data);
        subject.save()
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} added a subject with id ${subject.id}`,action:"create",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({
            status:true,
            msg:"Subject added successfully",
            result:subject
        })
    } catch(error){
        next({msg:"Error adding subject"})
    }

}

const updateSubject = async (req,res,next) => {
    let data = req.body;
    try{
        let subject = await Subject.findByIdAndUpdate(req.params.id,{
            $set:data
        })
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} updated a subject with id ${subject.id}`,action:"update",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({status:true,msg:"Subject Updated Successfully"})
    } catch(error){
        next({msg:"Error updating subject"})
    }
} 

const listSubjects = async (req,res,next) => {
    try{
        let subject = await Subject.find({}).populate('course')
        res.json({result:subject,msg:"Subjects fetched successfully"})
        
    } catch(error){
        next({msg:"Error showing list of subjects"})
    }
}

const showSubject = async (req,res,next) => {
    try{
        let subject = await Subject.findById(req.params.id).populate('course')
        res.json({result:subject,status:true,msg:"Subject fetched successfully"})
    }catch(error){
        next({msg:"Error fetching subject"})
    }
}

const deleteSubject = async (req,res,next)=>{
    try{
        let subject = await Subject.findByIdAndDelete(req.params.id)
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} deleted a subject with id ${subject.id}`,action:"delete",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({result:subject,status:true,msg:"Subject Deleted Successfully"})

    } catch(error){
        next({msg:"Error deleting subject"})
    }
}

module.exports = {addSubject,updateSubject,listSubjects,showSubject,deleteSubject}