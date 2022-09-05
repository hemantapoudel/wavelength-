const Log = require("../models/activity_log.model")

const viewLogs = async (req,res,next) => {
    try{
        let result = await Log.find({})
        res.json({
            result:result,
            msg:"Logs fetched successfully"
        })

    } catch(error){
        next({msg:"Error viewing activity logs"})
    }

}

module.exports = {viewLogs}