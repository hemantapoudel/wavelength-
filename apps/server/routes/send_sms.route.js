const axios = require('axios')
const router = require("express").Router()
const body_parser = require("body-parser")
const sendSms = require('../controllers/send_sms.controller')
const parser = body_parser.json()

router.route("/sms/send")
    .post(parser,sendSms)

module.exports = router
