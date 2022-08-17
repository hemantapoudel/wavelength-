const { addCourse, updateCourse, listCourses, showCourse, deleteCourse } = require("../controllers/course.controller")

const router = require("express").Router()
const body_parser = require("body-parser")
const parser = body_parser.json()

router.route('/course/add')
    .post(parser,addCourse)
router.route('/course/update/:id')
    .put(parser,updateCourse)
router.route('/course/listall')
    .get(parser,listCourses)
router.route('/course/fetch/:id')
    .get(parser,showCourse)
router.route('/course/delete/:id')
    .delete(parser,deleteCourse)

module.exports = router