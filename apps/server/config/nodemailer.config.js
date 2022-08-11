const nodemailer=require("nodemailer")
const Verify=require("../models/verification.model")
const User=require("../models/user.model");
const bcrypt = require("bcrypt")

const transporter = nodemailer.createTransport({
    host:"mail.binaryentrance.com",
    port:587,
    secure:false,
    auth:{
        user:"noreply@binaryentrance.com",
        pass:"noreplybinary"
    },
    tls:{
        rejectUnauthorized:false
    }
})

const generateToken = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

const sendVerificationCode = async (req, res, next) => {
    let data=req.body;
    try{
        let user=await User.findOne({email:data.email})
        if(!user){
            res.status(401).json({
                status:false,
                msg:"User with such email doesn't exist"
            })
        }
        let existing_code=await Verify.findOne({email:data.email})
                
            
            let verification_code=generateToken().toString();
            let verification_code_database=bcrypt.hashSync(verification_code,10).toString();
            
            let mailData={
                from: "noreply@binaryentrance.com",
                to: data.email,
                subject: "Verification",
                html:`Dear <b>${user.full_name} </b> <br> Your Verification Code is <b> ${verification_code}</b> <br>Use this verification
                code to verify your account`,
            }
            if(existing_code){
                await transporter.sendMail(mailData,(error,info) => {
                    if(error){
                        console.log(error)
                    }
                    else{
                        let veri_data={verification_code:verification_code_database,email:data.email}
                        console.log(veri_data)
                        Verify.findOneAndUpdate({email:data.email},veri_data,(error,success)=>{
                            if(error){
                                console.log(error)
                            }
                            else{
                                
                                res.json({
                                    info: info,
                                    status: true,
                                    msg:"Check your mail for verification code"
                                })

                            }
                        })
                        

                    }
                })
            }
            else {
                await transporter.sendMail(mailData,(error,info)=>{
                    if(error){
                        console.log(error)
                    }
                    else{
                        let veri_data={verification_code:verification_code_database,email:data.email}
                        let verificationCode=new Verify(veri_data);
                        verificationCode.save()
                            .then((response)=>{
                                res.json({
                                    info: info,
                                    status: true,
                                    msg:"Check your email for verification code"
                                })
                            })
                            .catch((error)=>{
                                next(error)
                            })
                    }
                }); 
            }
        
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

const verify_user = async (req,res,next) => {
    let data = req.body;
    try{
        let update_user={is_verified:true};
        let code_data = await Verify.findOne({email:data.email})
        let user=await User.findOne({email:data.email})
        if(!bcrypt.compareSync(data.verification_code,code_data.verification_code)){
            res.status(400).json({
                status: false,
                msg: "Invalid Verification Code"
            })
        } else{
            let verify_user = await User.findByIdAndUpdate(user._id,{
                $set:update_user
            })
            res.json({
                status:true,
                msg:"User Verified Successfully"
            })
            let delete_code = await Verify.findByIdAndDelete(code_data._id)
            console.log(delete_code)

        }

    }
    catch(error){
        next(error)
    }
}

module.exports = {sendVerificationCode,verify_user}