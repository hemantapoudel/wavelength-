const router = require("express").Router()
const UserController = require("../controllers/user.controller")
const user_control = new UserController()

const body_parser = require("body-parser")
const parser = body_parser.json()
const {isLoggedIn} = require("../middlewares/logincheck.middleware")
const {updateUser} = require("../controllers/updateUser.controller")
const {isSuperadmin, isAdmin, isModerator, isMentor, isStudent, isSuperadminOrAdmin, isVerified, selfUpdate} = require("../middlewares/rbac.middleware")
const uploader = require("../middlewares/uploader.middleware")

router.route('/user/add')
    .post(isLoggedIn,isSuperadmin,uploader.single('profile_pic'),user_control.addUser)

router.route('/users')
    .get(isLoggedIn,isSuperadmin,user_control.listAll)

router.route('/user/update/:id')
    .put(isLoggedIn,selfUpdate,uploader.single('profile_pic'),updateUser) 

router.route('/user/fetch/:id')
    .get(isLoggedIn,isSuperadmin,user_control.show)

router.route('/user/delete/:id')   
    .delete(isLoggedIn,isSuperadmin,user_control.deleteUser)


    

module.exports = router