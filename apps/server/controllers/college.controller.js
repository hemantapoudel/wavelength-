const College = require("../models/college.model")

const addCollege = (req,res,next) => {
    let data = req.body;
    try{
        let add_college = new College(data)
        add_college.save()
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
        res.json({
            msg:"College fetched successfully",
            result:college
        })

    } catch(error){
        next({msg:"Error fetching College"})
    }
}

const deleteCollege = async (req,res,next) => {
    try{
        let college = await College.findByIdAndDelete(req.params.id)
        res.json({
            msg:"College deleted successfully",
            result:college
        })
    } catch(error){
        next({msg:"Error deleting college"})
    }
}

module.exports = {addCollege,updateCollege,fetchCollege,listAllColleges,deleteCollege}