const User=require("../models/user.model")
const bcrypt=require('bcrypt')
const CONSTANTS=require("../config/constants")
const jwt = require("jsonwebtoken")

class AuthController{

    login = async (req,res,next) =>{
        let data=req.body;
        try{
            let result=await User.findOne({phone:data.phone})
            if(result){
                if(bcrypt.compareSync(data.password,result.password)){
                    let token = this.generateToken({
                        id:result._id,
                        full_name:result.full_name,
                        email:result.email,
                        role:result.role,
                        course:result.course

                    })
                    if(result['profile_pic']){result['profile_pic']=CONSTANTS.host + result['profile_pic']}
                    
                    console.log(result['profile_pic'])
                    res.json({
                        token:token,
                        user:result,
                        status:true,
                        msg:"You are successfully Logged In"
                    }
                    )
                }
                else{
                    res.status(400).json({
                        result:null,
                        status:false,
                        msg:"Password Doesn't matched"
                    })
                }
            } else{
                res.status(400).json({
                    result:null,
                    status:false,
                    msg:"User Not Found"
                })
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
            let user=await User.findOne({phone:data.phone});
            if(user){
                next({status:400,msg:"Phone Number Already Registered"})
            } else{
                let user=new User(data);
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