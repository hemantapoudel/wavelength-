const router = require("express").Router()
const body_parser = require("body-parser")
const { showResult } = require("../controllers/result.controller")
const parser = body_parser.json()


router.route("/result/:id")
    .get(parser,showResult)
router.route("/result")

module.exports = router