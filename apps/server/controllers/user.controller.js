const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const { findByIdAndUpdate } = require("../models/user.model");

class UserController {
    addUser = async (req, res, next) => {
        let data = req.body;
        if(req.file){
            data.profile_pic = req.file.filename;
        }
        data['password']=bcrypt.hashSync(data['password'],10);
        try{
            let user =await User.findOne({email:data.email})
            if(user){
                next({status:400,msg:"Email Already Registered"})
            } else{
                let user = new User({
                    full_name:data.full_name,
                    email:data.email,
                    phone:data.phone,
                    password:data.password,
                    course:data.course,
                    address:data.address,
                    profile_pic:data.profile_pic,
                });
                user.save()
                res.json({status:true,msg:"User Registered Successfully"})
            }
        } 
        catch(error){
            next(error)
        }
    }

    listAll = async (req,res,next) => {
        try{
            let users = await User.find({},{password:0})
            
            res.json({
                result:users,
                status:true,
                msg:"All Users Fetched"
            })
        } catch(error){
            next({status:500, msg:"Error Fetching Users Data"})
        }
    }

    show = async (req,res,next) => {
        try{
            let user = await User.findById(req.params.id, {password:0});
           
           
            res.json({
                status:true, 
                user:user, 
                msg:"User Fetched Successfully"
            })
        } catch(error){
            next({status:500,msg:"Error Fetching User"})
        }
    }

    deleteUser = async (req, res, next) => {
        try{    
            let delete_user = await User.findByIdAndDelete(req.params.id);
            res.json({
                result:delete_user,
                status:true,
                msg:"User Deleted Successfully"
            })

        } catch(error){
            next({status:500,msg:"Error Deleting User"})
        }
    }

    
    


}

module.exports = UserController