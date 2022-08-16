const express = require("express")
const app=express()

const auth_routes=require("./auth.routes")
const user_routes=require("./user.routes")
const univerisity_routes = require("./univerisity.routes")

app.use("/",auth_routes)
app.use("/",user_routes)
app.use("/",univerisity_routes)



module.exports=app