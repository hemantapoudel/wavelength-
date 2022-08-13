const router = require("express").Router()

const body_parser=require("body-parser")
const parser=body_parser.json()
let uploader = require("../middlewares/uploader.middleware");

const AuthController=require("../controllers/auth.controller")
const auth_controller=new AuthController()

const {sendVerificationCode,verify_user} = require("../config/nodemailer.config")

router.route("/register")
    .post(parser,uploader.single('profile_pic'),auth_controller.register)

router.route("/login")
    .post(parser,auth_controller.login)
//{"email":"xyz@gmail.com","password":"password"}

router.route("/send-verification-code")
    .post(parser,sendVerificationCode)
//{"email":"xyz@gmail.com"}

router.route("/verify-user")
    .put(parser,verify_user)
//{"email":"xyz@gmail.com","verification_code":"2334"}

module.exports=router;