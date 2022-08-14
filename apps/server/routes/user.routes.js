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

router.route('/user/:id')
    .get(isLoggedIn,isSuperadmin,user_control.show)
    .put(isLoggedIn,selfUpdate,uploader.single('profile_pic'),updateUser)
    

module.exports = router