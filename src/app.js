const express=require('express')
const userModel = require('./models/user.model')
 const userController = require("./controller/user.controller")
const categoryController = require('./controller/category.controller')
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

    // category routes
    app.post('/createCategory',categoryController.createCategory)
    app.get("/getAllCategory",categoryController.getAllCategory)
    app.get('/getsingleCategory/:name',categoryController.getsingleCategory)
    app.put("/updateCategory/:id",categoryController.updateCategory)
    app.delete("/deleteCategory/:id",categoryController.deleteCategory)

app.listen( port||5000,()=>{
    console.log(`Server is running on ${port} url: http://localhost:${port}`)
});

module.exports = {app}