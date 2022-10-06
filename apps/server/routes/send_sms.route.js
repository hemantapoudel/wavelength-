const axios = require('axios')
const router = require("express").Router()
const body_parser = require("body-parser")
const {sendSms,verifyPhone} = require('../controllers/send_verification_sms.controller')
const parser = body_parser.json()

router.route("/sms-verification/send")
    .post(parser,sendSms)
router.route("/sms-verify")
    .post(parser,verifyPhone)

module.exports = router
