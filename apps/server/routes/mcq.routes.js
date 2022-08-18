const router = require("express").Router()
const body_parser = require("body-parser")
const { addMCQ, addManyMCQ, listAllMcqs, mcqCheck, fetchMcqs } = require("../controllers/mcq.controller")
const parser = body_parser.json()

router.route("/mcq/add")
    .post(parser,addMCQ)
router.route("/mcq/addmany")
    .post(parser,addManyMCQ)
router.route("/mcq/listall")
    .get(listAllMcqs)
router.route("/mcq/fetch")
    .post(parser,fetchMcqs)
router.route("/mcq/check")
    .post(parser,mcqCheck)

module.exports = router