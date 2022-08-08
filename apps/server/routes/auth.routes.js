const router = require("express").Router()

const body_parser=require("body-parser")
const parser=body_parser.json()
let uploader = require("../middlewares/uploader.middleware");

const AuthController=require("../controllers/auth.controller")
const auth_controller=new AuthController()

router.route("/register")
    .post(parser,uploader.single('image'),auth_controller.register)

router.route("/login")
    .post(parser,auth_controller.login)

module.exports=router;