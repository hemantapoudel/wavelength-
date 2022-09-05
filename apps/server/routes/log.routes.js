const router = require("express").Router()
const body_parser = require("body-parser")
const { viewLogs } = require("../controllers/log.controller")
const { isLoggedIn } = require("../middlewares/logincheck.middleware")
const parser = body_parser.json()

router.route("/log/view")
    .get(viewLogs)

module.exports = router