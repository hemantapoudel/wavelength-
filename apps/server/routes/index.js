const express = require("express")
const app=express()

const auth_routes=require("./auth.routes")
const user_routes=require("./user.routes")
const univerisity_routes = require("./university.routes")
const upload_routes = require("./uploads.routes")
const course_routes = require("./course.routes")
const subject_routes = require("./subject.routes")
const test_routes = require("./test.routes")
const mcq_routes = require("./mcq.routes")
const result_routes = require("./result.routes")
const blog_routes = require("./blog.routes")
const notice_routes = require("./notice.routes")



app.use("/",auth_routes)
app.use("/",user_routes)
app.use("/",univerisity_routes)
app.use("/",course_routes)
app.use("/",upload_routes)
app.use("/",subject_routes)
app.use("/",test_routes)
app.use("/",mcq_routes)
app.use("/",result_routes)
app.use("/",blog_routes)
app.use("/",notice_routes)

module.exports=app