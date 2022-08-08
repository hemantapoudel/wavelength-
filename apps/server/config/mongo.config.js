const mongoose=require("mongoose")
const dbUrl="mongodb://localhost:27017/wavelength"
mongoose.connect(dbUrl,{
    autoIndex:true,
    autoCreate:true
},(err)=>{
    if(err){
        console.log("Error connecting database")
    }
    else{
        console.log("Database Connected Successfully !")
    }
}


)