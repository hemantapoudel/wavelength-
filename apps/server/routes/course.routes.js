const { addCourse } = require("../controllers/course.controller")

const router = require("express").Router()
const body_parser = require("body-parser")
const parser = body_parser.json()

router.route('/course/add').post(addCourse)