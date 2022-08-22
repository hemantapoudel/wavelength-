const Result = require("../models/result.model")

const showResult = async (req,res,next) => {
    let data = req.body;
    try{
        let result = await Result.find({test:data.test})
        res.json({
            msg:"Result fetched successfully",
            result:result
        })

    } catch(error){
        next({msg:"Error showing result"})
    }

}

const showIndividualResult = async (req,res,next)=>{
    let data=req.body
    try{
        let result = await Result.find({test:data.test,submitted_by:data.submitted_by})
        res.json({
            msg:"Result fetched successfully",
            result:result
        })

    } catch(error){
        next({msg:"Error fetching result"})
    }
}

module.exports = {showResult,showIndividualResult}