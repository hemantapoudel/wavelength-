const CONSTANTS=require("../config/constants")
const axios = require("axios")

const sendSms = async (req,res,next) => {
    data=req.body
    try{
        const response = await axios.post('https://sms.aakashsms.com/sms/v3/send',{
            auth_token:CONSTANTS.sms_auth_token,
            to:data.phone,
            text:data.text
        })
        res.json({
            msg:"SMS sent successfully"
        })

    } catch(error){
        next({msg:"Error sending sms"})
    }
}

module.exports = sendSms