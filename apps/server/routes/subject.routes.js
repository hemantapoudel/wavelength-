const router = require("express").Router()
const body_parser = require("body-parser")
const { addSubject, updateSubject, listSubjects, showSubject, deleteSubject } = require("../controllers/subject.controller")
const parser = body_parser.json()

router.route("/subject/add")
    .post(parser,addSubject)
router.route("/subject/update/:id")
    .put(parser,updateSubject)
router.route("/subject/listall")
    .get(parser,listSubjects)
router.route("/subject/fetch/:id")
    .get(parser,showSubject)
router.route("/subject/delete/:id")
    .delete(parser,deleteSubject)

module.exports = router