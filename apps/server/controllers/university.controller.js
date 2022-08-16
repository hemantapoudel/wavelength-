const University = require("../models/university.model");

const addUniversity = (req,res,next) => {
    let data = req.body;
    console.log(data.title)
    try{
        let university = new University(data)
        university.save()
        res.json({
            status:true,
            msg:"University Added Successfully"
        })

    } catch(error){
        next({msg:"error adding university"})
    }
}

const updateUniversity = async (req,res,next) => {
    let data = req.body;
    try{
        let result = await University.findByIdAndUpdate(req.params.id,{
            $set:data
        })
        res.json({status:true,msg:"University Updated Successfully"})
    } catch(error){
        next({msg:"Error updating University"})
    }
}

const listUniversities = async (req,res,next) => {
    try{
        let universities = await University.find({})
        res.json({universities:universities,msg:"Universities fetched successfully"})

    } catch(error){
        next({msg:"Error showing list of universities"})
    }
}

const showUniversity = async (req,res,next) => {
    try{
        let result = await University.findById(req.params.id)
        res.json({result:result,status:true,msg:"Univerisity fetched successfully"})
    }catch(error){
        next({msg:"Error fetching university"})
    }
}

const deleteUniveristy = async (req,res,next)=>{
    try{
        let result = await University.findByIdAndDelete(req.params.id)
        res.json({result:result,status:true,msg:"University Deleted Successfully"})

    } catch(error){
        next({msg:"Error deleting University"})
    }
}

module.exports = {addUniversity,listUniversities,showUniversity,deleteUniveristy,updateUniversity}