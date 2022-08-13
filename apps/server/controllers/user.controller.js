const User = require("../models/user.model")
const bcrypt = require("bcrypt")

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



}

module.exports = UserController