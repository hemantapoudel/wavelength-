const router = require("express").Router()
const body_parser = require("body-parser")
const { addSubject, updateSubject, listSubjects, showSubject, deleteSubject } = require("../controllers/subject.controller")
const { isLoggedIn } = require("../middlewares/logincheck.middleware")
const parser = body_parser.json()
const uploader = require('../middlewares/uploader.middleware')
router.route("/subject/add")
    .post(isLoggedIn,parser,uploader.single('image'),addSubject)
router.route("/subject/update/:id")
    .put(isLoggedIn,parser,updateSubject)
router.route("/subject/listall")
    .get(isLoggedIn,parser,listSubjects)
router.route("/subject/fetch/:id")
    .get(isLoggedIn,parser,showSubject)
router.route("/subject/delete/:id")
    .delete(isLoggedIn,parser,deleteSubject)

module.exports = router