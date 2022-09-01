const College = require("../models/college.model")
const Log = require("../models/activity_log.model")
const addCollege = (req,res,next) => {
    let data = req.body;
    try{
        let add_college = new College(data)
        add_college.save()
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} added a college with id ${add_college.id}`,action:"create",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({
            msg:"college added successfully",
            result:add_college
        })

    } catch(error){
        next({msg:"Error adding college"})
    }
}

const updateCollege = async (req,res,next) => {
    let data = req.body
    try{
        let update_college = await College.findByIdAndUpdate(req.params.id,{
            $set:data
        })
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} updated a college with id ${update_college.id}`,action:"update",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({
            msg:"Successfully updated college"
        })

    } catch(error){
        next({msg:"Error updating college"})
    }
}

const listAllColleges = async (req,res,next) => {
    try{
        let colleges = await College.find({})
        res.json({
            msg:"all college fetched successfully",
            result:colleges
        })

    } catch(error){
        next({msg:"Error fetching colleges"})
    }
}

const fetchCollege = async (req,res,next) => {
    let data = req.body
    try{
        let college = await College.findById(req.params.id)
        let views = Number(college.views_count)+1
        let update_view = await College.findByIdAndUpdate(req.params.id,{
            $set:{views_count:views}
        })
        res.json({
            msg:"College fetched successfully",
            result:college,
        })

    } catch(error){
        next({msg:"Error fetching College"})
    }
}

const deleteCollege = async (req,res,next) => {
    try{
        let college = await College.findByIdAndDelete(req.params.id)
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} deleted a college with id ${college.id}`,action:"delete",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({
            msg:"College deleted successfully",
            result:college
        })
    } catch(error){
        next({msg:"Error deleting college"})
    }
}

module.exports = {addCollege,updateCollege,fetchCollege,listAllColleges,deleteCollege}