const bcrypt = require("bcrypt")
const User = require("../models/user.model")
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
        res.json({status:true,msg:"User Updated Successfully"})

    } catch(error){
         next({status:403,msg:"Error Updating User"})
    }
}

module.exports = {updateUser}