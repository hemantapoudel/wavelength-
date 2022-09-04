const Test = require("../models/test.model")
const Log = require("../models/activity_log.model")

const addTest = (req,res,next)=>{
    let data = req.body;
    try{
        let test = new Test(data);
        test.save()
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} added a test with id ${test.id}`,action:"create",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({
            result:test,
            status:true,
            msg:"Test added successfully"
        })
    } catch(error){
        next({msg:"Error adding test"})
    }

}

const updateTest = async (req,res,next) => {
    let data = req.body;
    try{
        let test_update = await Test.findByIdAndUpdate(req.params.id,{
            $set:data
        })
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} updated a test with id ${test_update.id}`,action:"update",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({
            status:true,
            msg:"Test updated successfully"
        })

    } catch(error){
        next({msg:"Error updating test"})
    }
}

const listTests = async (req,res,next) => {
    try{
        let tests = await Test.find({}).populate('course')
        res.json({
            status:true,
            msg:"Tests fetched successfully",
            result:tests

        })
    } catch(error){
        next({msg:"Error fetching tests"})
    }
}

const showTest = async (req,res,next) => {
    try{
        let test = await Test.findById(req.params.id).populate('course')
        res.json({
            status:true,
            msg:"Test fetched successfully",
            result:test
        })

    } catch(error){
        next({msg:"Error fetching test"})
    }
}

const deleteTest = async (req,res,next) =>{
    try{
        let test = await Test.findByIdAndDelete(req.params.id)
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} deleted a test with id ${test.id}`,action:"delete",ip:req.ip}
        let log=new Log(log_data)
        log.save()
        res.json({
            status:true,
            msg:"Test deleted successfully",
            result:test
        })
    } catch(error){
        next({msg:"Error deleting test"})
    }
}

module.exports = {addTest,updateTest,listTests,showTest,deleteTest}