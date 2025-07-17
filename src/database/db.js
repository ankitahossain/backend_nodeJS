const mongoose = require('mongoose')
require('dotenv').config()
exports.connectDB = async()=>{
    try{
   const connectStatus =  await mongoose.connect(process.env.mongodbURL)
   console.log("Database connected successfully",connectStatus.connections[0].host)   
}
    catch(err){
        console.log("Err from database connection",err)
    }
}