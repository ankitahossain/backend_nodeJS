const express=require('express')
const path = require('path')
const userModel = require('./models/user.model')
const upload = require('./middleware/multer.middleware')
 const userController = require("./controller/user.controller")
const categoryController = require('./controller/category.controller')
const blogController = require('./controller/blog.controller')
const app=express()
require('dotenv').config()
const port = process.env.PORT 
// use middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// user routes
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

    // blog api / routes
app.post('/createBlog',upload.single("image"),blogController.createBlog)
app.use('/blog', express.static("temp"))
app.get("/getAllBlog",blogController.getAllBlog)
app.get('/getSingleBlog/:id',blogController.getSingleBlog)
app.put('/updateBlog/:id',upload.single("image"),blogController.updateBlog)

app.listen( port||5000,()=>{
    console.log(`Server is running on ${port} url: http://localhost:${port}`)
});

module.exports = {app}