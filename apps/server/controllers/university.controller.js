const University = require("../models/university.model");
const CONSTANTS=require("../config/constants")
const Log = require("../models/activity_log.model")



const addUniversity = (req,res,next) => {
    let data = req.body;
    if(req.file){
        data.profile_pic=req.file.filename;
    }
    try{
        let university = new University(data)
        university.save()
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} added a university with blog id ${university.id}`,action:"create",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({
            status:true,
            result:university,
            msg:"University Added Successfully"
        })

    } catch(error){
        next({msg:"error adding university"})
    }
}

const updateUniversity = async (req,res,next) => {
    let data = req.body;
    if(req.file){
        data.profile_pic=req.file.filename
    }
    try{
        let result = await University.findByIdAndUpdate(req.params.id,{
            $set:data
        })
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} updated a university with blog id ${result.id}`,action:"update",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({status:true,msg:"University Updated Successfully"})
    } catch(error){
        next({msg:"Error updating University"})
    }
}

const listUniversities = async (req,res,next) => {
    try{
        let universities = await University.find({})
        res.json({result:universities,msg:"Universities fetched successfully"})

    } catch(error){
        next({msg:"Error showing list of universities"})
    }
}

const showUniversity = async (req,res,next) => {
    try{
        let result = await University.findById(req.params.id)
        if(result['profile_pic']){result['profile_pic']=CONSTANTS.host + result['profile_pic']}
        if(result['cover_pic']){result['cover_pic']=CONSTANTS.host + result['cover_pic']}
        res.json({result:result,status:true,msg:"Univerisity fetched successfully"})
    }catch(error){
        next({msg:"Error fetching university"})
    }
}

const deleteUniveristy = async (req,res,next)=>{
    try{
        let result = await University.findByIdAndDelete(req.params.id)
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} deleted a university with blog id ${result.id}`,action:"delete",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({result:result,status:true,msg:"University Deleted Successfully"})

    } catch(error){
        next({msg:"Error deleting University"})
    }
}

module.exports = {addUniversity,listUniversities,showUniversity,deleteUniveristy,updateUniversity}