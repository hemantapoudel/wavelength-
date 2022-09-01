const { addCourse, updateCourse, listCourses, showCourse, deleteCourse } = require("../controllers/course.controller")
const uploader = require('../middlewares/uploader.middleware')
const router = require("express").Router()
const body_parser = require("body-parser")
const { isLoggedIn } = require("../middlewares/logincheck.middleware")
const parser = body_parser.json()

router.route('/course/add')
    .post(isLoggedIn,parser,uploader.single('image'),addCourse)
router.route('/course/update/:id')
    .put(isLoggedIn,parser,updateCourse)
router.route('/course/listall')
    .get(parser,listCourses)
router.route('/course/fetch/:id')
    .get(parser,showCourse)
router.route('/course/delete/:id')
    .delete(isLoggedIn,parser,deleteCourse)

module.exports = router