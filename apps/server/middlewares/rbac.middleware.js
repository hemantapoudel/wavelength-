const User = require("../models/user.model")
const isSuperadmin = (req,res,next) => {
    let user =req.auth_user;
    if(user && user.role === "super_admin"){
        next()
    } else{
        next({status:403, msg:"Unauthorized Access"})
    }
}

const isAdmin = (req,res,next) => {
    let user =req.auth_user;
    if(user && user.role === "admin"){
        next()
    } else{
        next({status:403, msg:"Unauthorized Access"})
    }
}

const isModerator = (req,res,next) => {
    let user =req.auth_user;
    if(user && user.role === "moderator"){
        next()
    } else{
        next({status:403, msg:"Unauthorized Access"})
    }
}

const isMentor = (req,res,next) => {
    let user =req.auth_user;
    if(user && user.role === "mentor"){
        next()
    } else{
        next({status:403, msg:"Unauthorized Access"})
    }
}

const isStudent = (req,res,next) => {
    let user =req.auth_user;
    if(user && user.role === "student"){
        next()
    } else{
        next({status:403, msg:"Unauthorized Access"})
    }
}

const isSuperadminOrAdmin = (req,res,next) => {
    let user =req.auth_user;
    if(user && (user.role === "super_admin" || user.role === "admin")){
        next()
    } else{
        next({status:403, msg:"Unauthorized Access"})
    }
}

const isVerified = (req,res,next) => {
    let user =req.auth_user;
    if(user && user.is_verified === true ){
        next()
    } else{
        next({status:403, msg:"Unauthorized Access"})
    }
}

const selfUpdate = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        if(user.id === req.auth_user.id){
            next()
        } else{
            next({status:403,msg:"Unauthorized Access"})
        }
    } 
    catch(error){
        next(error)
    }
}


module.exports = {isSuperadmin,isAdmin,isModerator,isMentor,isStudent,isSuperadminOrAdmin, isVerified, selfUpdate}