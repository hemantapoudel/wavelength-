let jwt = require("jsonwebtoken")
let User = require("../models/user.model")
let CONSTANTS = require("../config/constants")


const isLoggedIn = async (req,res,next) => {
    let token = '';
    if(req.headers['authorization']){
        token = req.headers['authorization']
    }
    try{
        let data=jwt.verify(token,CONSTANTS.JWT_SECRET);
        if(!token || !data){
            next({
                status: 401,
                msg:"Unauthorized Accesss"
            })
        } else{
        let user = await User.findById(data.id)
        if(!user){
            next({
                status:403,
                msg:"User Doesn't exist anymore"
            })
        }
        else{
            req.auth_user=user
            next()
        }
    }
    }
    catch(error){
        next({
            status: 401,
            msg:"Unauthorized Access"
        })
    }
}

module.exports = {isLoggedIn}