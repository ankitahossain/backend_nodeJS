const express=require('express')
const userModel = require('./models/user.model')
 const userController = require("./controller/user.controller")
const app=express()
require('dotenv').config()
const port = process.env.PORT 
// use middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.post('/registration',userController.registration)
app.post('/login',userController.login)
    // console.log('Hello from test route')
    // res.end('hi!')
    




app.listen( port||5000,()=>{
    console.log(`Server is running on ${port} url: http://localhost:${port}`)
});

module.exports = {app}