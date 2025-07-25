const { transformWithEsbuild } = require('vite')
const blogModel = require('../models/blog.model')
const path = require('path')
const fs = require("fs")

exports.createBlog = async (req, res) => {
  try {
    console.log(req.file)
    const saveBlog = await new blogModel({
      blogTitle: req.body.blogTitle,
      blogDescription: req.body.blogDescription,
      image: `http://localhost:4000/blog/${req.file.filename}`
    }).save()
    if (!saveBlog) {

      return res.status(500).json({
        msg: "Error in creating blog"
      })
    }
    return res.status(200).json({
      msg: "Blog created successfully",
      data: saveBlog

    })
  }
  catch (error) {
    console.log("Error in creating blog", error)
    res.status(500).json({
      msg: "Internal server error"
    })
  }
}

exports.getAllBlog = async (req, res) => {
  try {
    const getAllBlog = await blogModel.find({}).select("-__v")
    if (!getAllBlog) {
      res.status(500).json({
        msg: "No blog found"
      })
    }
    return res.status(200).json({
      msg: "Blogs retrieved successfully",
      data: getAllBlog

    })

  } catch (error) {
    console.log("Error in creating blog", error)
    res.status(500).json({
      msg: "Internal server error"
    })
  }

}

exports.getSingleBlog = async (req, res) => {
  try {
    const id = req.params.id.trim()
    const findBlog = await blogModel.findById(id)
    return res.status(200).json({
      msg: "Blog retrieved successfully",
      data: findBlog
    })

  } catch (error) {
    console.log("Error in creating blog", error)
    res.status(500).json({
      msg: "Internal server error"
    })
  }
}

exports.updateBlog = async (req, res) => {
  try {

    const { id } = req.params
    const { blogTitle, blogDescription } = req.body
    const image = req.file

    const Blog = await blogModel.findById(id)
    Blog.blogTitle = blogTitle || Blog.blogTitle,
      Blog.blogDescription = blogDescription || Blog.blogDescription,
      Blog.image = `http://localhost:4000/blog/${req.file.filename}` || Blog.image

      // todo: Update any specific key
  //  blogTitle
    if (req.body.blogTitle) {
      Blog.blogTitle = req.body.blogTitle
      }
    
      else {
      Blog.blogTitle
    }
    

    //  blogDescription
    if (req.body.blogDescription) {
      Blog.blogDescription = req.body.blogDescription
      }
    
      else {
      Blog.blogDescription
    }
// image
    if (req.url) {
      
      // console.log(Blog.image)
     
      if(Blog.image){
       const part = Blog.image.split("/")
       console.log(part[part.length - 1])

  // const targetPath = path.join(__dirname, '../../../../public/temp', part[part.length - 1]);
  const targetPath = path.join("public", "temp",part[part.length - 1])


      //  console.log(targetPath)
       // previous image remove
       fs.unlinkSync(targetPath)
      }
      
      //  new image add
       Blog.image =`http://localhost:4000/blog/${req.file.filename}`
       
      // console.log(Blog.image)
     

    }
    else {
      Blog.image = Blog.image
    }
    

    await Blog.save()
    return res.status(200).json({
      msg: "Blog updated successfully",
      data: Blog
    })


  } catch (error) {
    console.log("Error in creating blog", error)
    res.status(500).json({
      msg: "Internal server error"
    })
  }
}