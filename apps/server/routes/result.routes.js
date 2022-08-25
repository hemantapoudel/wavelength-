const router = require("express").Router()
const body_parser = require("body-parser")
const { showResult, showIndividualResult } = require("../controllers/result.controller")
const parser = body_parser.json()


router.route("/result/")
    .get(parser,showResult)
router.route("/result/fetch")
    .post(parser,showIndividualResult)

module.exports = router