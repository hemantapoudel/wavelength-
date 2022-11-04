const router = require("express").Router()
const body_parser = require("body-parser")
const parser = body_parser.json()
const {sendSms,resetPassword} = require("../controllers/forget_password.controller")

router.route('/send-otp')
    .post(parser,sendSms)
router.route('/reset-password')
    .put(parser,resetPassword)


module.exports = router