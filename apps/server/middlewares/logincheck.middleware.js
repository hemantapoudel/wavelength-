let jwt = require("jsonwebtoken")
let User = require("../models/user.model")
let CONSTANTS = require("../config/constants")

const isLoggedIn = (req,res,next) => {
    let token = '';
    if(req.headers['authorization']){
        token = req.headers['authorization']
    }
    let data=jwt.verify(token,CONSTANTS.JWT_SECRET);
    if(!token || !data){
        next({
            status: 403,
            msg:"Unauthorized Access"
        })
    }
    else{
        let user = User.findById(data.id)
        if(!user){
            next({
                status:403,
                msg:"User Doesn't exist anymore"
            })
        }
        else{
            req.auth_user=user;
            next()
        }
    }
}

module.exports = {isLoggedIn}