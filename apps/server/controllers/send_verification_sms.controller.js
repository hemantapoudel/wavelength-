const CONSTANTS=require("../config/constants")
const axios = require("axios")
const Verify=require("../models/phone_verification.model")
const bcrypt = require("bcrypt")

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

const sendSms = async (req,res,next) => {
    let data=req.body
    let otp=generateOTP().toString()
    let existing_phone = await Verify.findOne({phone:data.phone})
    try{
        const response = await axios.post('https://sms.aakashsms.com/sms/v3/send',{
            auth_token:CONSTANTS.sms_auth_token,
            to:data.phone,
            text: `Your OTP for Verification is ${otp}. - Wavelength Academy`
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
    } catch(error){
        next({msg:"Error sending otp"})
    }
}

const verifyPhone = async (req,res,next) => {
    let data = req.body
    try{
        let user_otp = data.otp
        let user_phone = data.phone
        let actual_otp = await Verify.findOne({phone:user_phone})

        if(actual_otp.otp==user_otp){
            res.json({msg:"OTP Verified Successfully"})
            await Verify.findOneAndDelete({phone:user_phone})
        } else{
            res.json({msg:"Enter the correct OTP for verification"})
        }


    } catch(error){
        next({msg:"Error while verifying user, try sending otp again"})
    }
}




module.exports = {sendSms,verifyPhone}