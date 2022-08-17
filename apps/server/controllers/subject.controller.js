const Course = require("../models/course.model")
const Subject = require("../models/subject.model")

const addSubject = (req,res,next) => {
    let data =req.body;
    try{
        let subject = new Subject(data);
        subject.save()
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
        res.json({result:subject,status:true,msg:"Subject Deleted Successfully"})

    } catch(error){
        next({msg:"Error deleting subject"})
    }
}

module.exports = {addSubject,updateSubject,listSubjects,showSubject,deleteSubject}