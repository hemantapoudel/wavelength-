const User=require("../models/user.model")
const bcrypt=require('bcrypt')
const CONSTANTS=require("../config/constants")
const jwt = require("jsonwebtoken")
const Log = require("../models/activity_log.model")

class AuthController{

    login = async (req,res,next) =>{
        let data=req.body;
        try{
            let result=await User.findOne({phone:data.phone})
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
                else if(!result.is_active){
                    res.status(400).json({
                        result:null,
                        status:false,
                        msg:"You have been blocked due to violation of code of conduct"
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

        const random_num = () => {
            return Math.floor(1000 + Math.random() * 9000);
        }
        const six_digit_random = () => {
            return Math.floor(100000 + Math.random() * 900000);
        }
        
        let refer_id = data.full_name.toUpperCase()+random_num().toString()
        let wavelength_id = "WL"+six_digit_random().toString()
        
        if(req.file){
            data.profile_pic=req.file.filename;
        }
        data['password']=bcrypt.hashSync(data['password'],10);
        try{
            let userWithEmail = await User.findOne({email:data.email});
            let userWithPhone = await User.findOne({phone:data.phone});
            if(userWithEmail){
                next({status:400,msg:"Email Already Registered"})
            } 
            else if(userWithPhone){
                next({status:400,msg:"Phone Number Already Registered"})
            } 
            else{
                let user_data = {"full_name":data.full_name,
                                "email":data.email,
                                "password":data.password,
                                "phone":data.phone,
                                "address":data.address,
                                "course":data.course,
                                "profile_pic":data.profile_pic,
                                "refer_id":refer_id,
                                "wavelength_id":wavelength_id,
                                "refered_by":data.refered_by
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
                    let log_data = {user:user.id,message:`User registered with name ${user.full_name} and user id ${user.id}`,action:"create",ip:req.ip}
                    let log=new Log(log_data)
                    log.save()
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