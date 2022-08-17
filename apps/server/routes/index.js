const express = require("express")
const app=express()

const auth_routes=require("./auth.routes")
const user_routes=require("./user.routes")
const univerisity_routes = require("./university.routes")
const upload_routes = require("./uploads.routes")
const course_routes = require("./course.routes")
const subject_routes = require("./subject.routes")
const test_routes = require("./test.routes")



app.use("/",auth_routes)
app.use("/",user_routes)
app.use("/",univerisity_routes)
app.use("/",course_routes)
app.use("/",upload_routes)
app.use("/",subject_routes)
app.use("/",test_routes)

module.exports=app