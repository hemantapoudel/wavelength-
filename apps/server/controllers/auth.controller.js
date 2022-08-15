const User=require("../models/user.model")
const bcrypt=require('bcrypt')
const CONSTANTS=require("../config/constants")
const jwt = require("jsonwebtoken")

class AuthController{

    login = async (req,res,next) =>{
        let data=req.body;
        try{
            let result=await User.findOne({email:data.email})
            if(!result){
                res.status(400).json({
                    result:null,
                    status:false,
                    msg:"User Not Found"
                })
                
            } else{
                if(!bcrypt.compareSync(data.password,result.password)){
                    res.status(400).json({
                        result:null,
                        status:false,
                        msg:"Password Doesn't matched"
                    })
                }
                else{
                    let token = this.generateToken({
                        id:result._id,
                        full_name:result.full_name,
                        email:result.email,
                        role:result.role,
                        course:result.course

                    })
                    if(result['profile_pic']){result['profile_pic']=CONSTANTS.host + result['profile_pic']}
                    res.json({
                        token:token,
                        user:result,
                        status:true,
                        msg:"You are successfully Logged In"
                    }
                    )
                    
                } 
            }
        } catch(error){
            next(error)
        }
    }



    register = async (req,res,next)=>{
        let data = req.body;
        if(req.file){
            data.profile_pic=req.file.filename;
        }
        data['password']=bcrypt.hashSync(data['password'],10);
        try{
            let user=await User.findOne({email:data.email});
            if(user){
                next({status:400,msg:"Email Already Registered"})
            } else{
                let user_data = {"full_name":data.full_name,
                                "email":data.email,
                                "password":data.password,
                                "phone":data.phone,
                                "address":data.address,
                                "course":data.course,
                                "profile_pic":data.profile_pic
                            }
                let user=new User(user_data);
                user.save()
                    .then((response)=>{
                        res.json({
                            user:response,
                            status:true,
                            msg:"User Registered Successfully" 
                        })
                    })
                    .catch((error)=>{
                        next(error)
                    })
            }

        } catch(error){
            next(error)
        }
    }

    generateToken = (data) =>{
        let token=jwt.sign(data,CONSTANTS.JWT_SECRET);
        return token;
    }

}

module.exports=AuthController