const router = require("express").Router()
const body_parser = require("body-parser")
const { addMCQ, addManyMCQ, listAllMcqs, mcqCheck, fetchMcqs, updateMcqs, deleteMcqs } = require("../controllers/mcq.controller")
const { isLoggedIn } = require("../middlewares/logincheck.middleware")
const parser = body_parser.json()
const uploader = require('../middlewares/uploader.middleware')
router.route("/mcq/add")
    .post(parser,uploader.single('image'),addMCQ)
router.route("/mcq/addmany")
    .post(isLoggedIn,parser,uploader.single('image'),addManyMCQ)
router.route("/mcq/listall")
    .get(listAllMcqs)
router.route("/mcq/fetch")
    .post(parser,uploader.single('image'),fetchMcqs)
router.route("/mcq/check")
    .post(parser,isLoggedIn,mcqCheck)
router.route("/mcq/update/:id")
    .put(parser,updateMcqs)
router.route("/mcq/delete/:id")
    .delete(parser,deleteMcqs)

module.exports = router