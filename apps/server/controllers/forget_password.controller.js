const CONSTANTS=require("../config/constants")
const axios = require("axios")
const Verify=require("../models/phone_verification.model")
const bcrypt = require("bcrypt")
const User = require("../models/user.model")

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

const sendSms = async (req,res,next) => {
    let data=req.body
    let otp=generateOTP().toString()
    let existing_phone = await Verify.findOne({phone:data.phone})
    try{
        let user = await User.findOne({phone:data.phone})
        if(!user){
            next({msg:"User with such phone number doesn't exist"})
        } else{
        const response = await axios.post('https://sms.aakashsms.com/sms/v3/send',{
            auth_token:CONSTANTS.sms_auth_token,
            to:data.phone,
            text: `Use the OTP ${otp} to reset your password. - Wavelength Academy`
        })
        res.json({
            msg:"OTP sent successfully"
        })
        if(!existing_phone){
            let save_otp = new Verify({phone:data.phone,otp:otp})
            save_otp.save()
        } else{
            await Verify.findOneAndUpdate({phone:data.phone},{otp:otp})
        }
    }
    } catch(error){
        next({msg:"Error sending otp"})
    }
}

const resetPassword = async (req,res,next) => {
    let data = req.body
    try{
        let user_otp = data.otp
        let user_phone = data.phone
        let new_password = bcrypt.hashSync(data['new_password'],10)
        let actual_otp = await Verify.findOne({phone:user_phone})

        if(actual_otp.otp==user_otp){
            let reset = {password:new_password}
            let userUpdate = await User.findOneAndUpdate({phone:user_phone},{
            $set:reset
        })
            res.json({msg:"Password reset successfully"})
            await Verify.findOneAndDelete({phone:user_phone})
        } else{
            res.status(401).json({msg:"Enter the correct OTP"})
        }
    } catch(error){
        next({msg:"Error while reseting password, try reseting password again"})
    }
}

module.exports = {sendSms,resetPassword}