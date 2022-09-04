const Notice = require("../models/notice.model")
const Log = require("../models/activity_log.model")

const addNotice = (req,res,next) => {
    let data = req.body;
    try{
        let add_notice = new Notice(data)
        add_notice.save()
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} added a Notice with id ${add_notice.id}`,action:"create",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({
            msg:"Notice added successfully",
            result:add_notice
        })

    } catch(error){
        next({msg:"Error adding Notice"})
    }
}

const updateNotice = async (req,res,next) => {
    let data = req.body
    try{
        let update_notice = await Notice.findByIdAndUpdate(req.params.id,{
            $set:data
        })
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} updated a Notice with id ${update_notice.id}`,action:"update",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({
            msg:"Successfully updated notice"
        })

    } catch(error){
        next({msg:"Error updating notice"})
    }
}

const listAllNotices = async (req,res,next) => {
    try{
        let notices = await Notice.find({})
        res.json({
            msg:"ALl Notices fetched successfully",
            result:notices
        })

    } catch(error){
        next({msg:"Error fetching notices"})
    }
}

const fetchNotice = async (req,res,next) => {
    let data = req.body
    try{
        let notice = await Notice.findById(req.params.id)
        res.json({
            msg:"Notice fetched successfully",
            result:notice
        })

    } catch(error){
        next({msg:"Error fetching notice"})
    }
}

const deleteNotice = async (req,res,next) => {
    try{
        let notice = await Notice.findByIdAndDelete(req.params.id)
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} deleted a Notice with id ${notice.id}`,action:"delete",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({
            msg:"Notice deleted successfully",
            result:notice
        })
    } catch(error){
        next({msg:"Error deleting Notice"})
    }
}

module.exports = {addNotice,updateNotice,fetchNotice,listAllNotices,deleteNotice}