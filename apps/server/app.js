const express = require("express")
const app = express()
require("./config/mongo.config")


const routes = require("./routes/index")
app.use("/api/v1",routes)
app.use('/uploads', express.static('uploads'));

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json')



app.use((err,req,res,next)=>{
    let status_code=err?.status||500;
    let msg=err?.msg||"Error";
    res.status(status_code).json(
        {
            result:null,
            status:false,
            msg:msg
        }
    )
})        

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3001,"localhost",(err)=>{
    if(err){
        console.log("Server Error")
    }
    else{
        console.log("Server connected to port 3001")
        console.log("Press Ctrl + C to end the connection")
    }
})