const router = require("express").Router()
const body_parser = require("body-parser")
const { addCollege, updateCollege, listAllColleges, fetchCollege, deleteCollege } = require("../controllers/college.controller")
const { isLoggedIn } = require("../middlewares/logincheck.middleware")
const parser = body_parser.json()

router.route("/college/add")
    .post(parser,addCollege)
router.route('/college/update/:id')
    .put(parser,updateCollege)
router.route('/college/listall')
    .get(parser,listAllColleges)
router.route('/college/fetch/:id')
    .get(parser,fetchCollege)
router.route('/college/delete/:id')
    .delete(parser,deleteCollege)

module.exports = router