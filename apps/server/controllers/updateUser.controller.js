const bcrypt = require("bcrypt")
const User = require("../models/user.model")
const Log = require("../models/activity_log.model")


const updateUser = async (req,res,next) => {
    try{
        let data=req.body
        if(req.file){
            data.profile_pic = req.file.filename;
        }
        if(data.password){
            data['password'] = bcrypt.hashSync(data['password'],10)
        }
        let update = {profile_pic:data.profile_pic, password:data.password, address:data.address }
        let userUpdate = await User.findByIdAndUpdate(req.params.id,{
            $set:update
        })
        
        let log_data = {user:req.auth_user.id,message:`${req.auth_user.full_name} Updated a user with name ${userUpdate.full_name} and user id ${userUpdate.id}`,action:"update",ip:req.ip}
        let log=new Log(log_data)
        log.save()

        res.json({status:true,msg:"User Updated Successfully"})

    } catch(error){
         next({status:403,msg:"Error Updating User"})
    }
}

module.exports = {updateUser}