const { validateBody } = require("../helpers/validator")
const categoryModel = require("../models/category.model")


// @desc createCategory 
exports.createCategory = async (req, res) => {
    try {
        //   console.log(req.body)
        const { empty, fieldName } = validateBody(req)
        
            if (empty) {
                return res.status(400).json({
                    msg: `${fieldName} is missing `
                })
            }
        
        //   const obj = validateBody(req)
        //   console.log(obj)

        // isExists categoryName
        const isNameExists = await categoryModel.findOne({ categoryName: req.body.categoryName })
        if (isNameExists) {
            return res.status(409).json({
                msg: `${req.body.categoryName} already exists`
            })
        }

        // saving the categoryModel to db 

        const category = await new categoryModel({

            categoryName: req.body.categoryName,
            categoryDescription: req.body.categoryDescription,
            isActive: req.body.isActive

        }).save()

        if (!category) {
            return res.status(401).json({
                msg: (`${req.body.categoryName} created failed`)
            })
        }

        return res.status(200).json({
            msg: (`${req.body.categoryName} created successfully`)
        })
    } catch (error) {
        console.log('Error in createCategory controller', error)
        return res.status(500).json({
            msg: "Error in createCategory controller",
            error: error||error
        })

    }
}

// @desc getAllCategory 
exports.getAllCategory = async (req, res) => {
    try {

        const allCategory = await categoryModel.find({}).select('-__v')
        if (!allCategory) {
            return res.status(404).json({
                msg: `No categories found`
            })
        }

        return res.status(200).json({
            msg: `Categories retrieved successfully`,
            data: allCategory
        })


    } catch (error) {
        console.log('Error in createCategory controller', error)
        return res.status(500).json({
            msg: "Error in createCategory controller",
            error: error
        })
    }
}

//@desc getsingleCategory
exports.getsingleCategory = async(req,res)=>{   

    try { 
        //  console.log(req.params)
          const {name} = req.params
          if(!name){
            return res.status(400).json({
                    msg: " Category name not found "
                })
          }

    const category = await categoryModel.findOne({ categoryName:name}) 
    if(!category){
        return res.status(404).json({
                    msg: "Category not found "
                })
    }

    return res.status(200).json({
                    msg: " Category found successfully",
                    data:category,
                    status:"ok"
                })

    } catch (error) {
        console.log('Error in getsingleCategory controller', error)
        return res.status(500).json({
            msg: "Error in getsingleCategory controller",
            error: error||error
        })
    }
}

// @desc updateCategory
exports .updateCategory =async(req,res)=>{
    try {
          const {id} = req.params
        const category = await categoryModel.findOne({ _id:id.trim()}) 
        // console.log(category)
        category.categoryName = req.body.categoryName||category.categoryName
        category.categoryDescription = req.body.categoryDescription||category.categoryDescription
         
        // save the updated items
        await category.save()
         return res.status(200).json({
                    msg: "Category updated ",
                    data: category
                })

        
    } catch (error) {
        
        console.log('Error in updateCategory controller', error)
        return res.status(500).json({
            msg: "Error in updateCategory controller",
            error: error||error
        })
    }}

 // desc deleteCategory

 exports.deleteCategory = async(req,res)=>{
    try {
        
        const {id} = req.params
        const deletedItem = await categoryModel.findOneAndDelete({ _id:id.trim()}) 
        if(!deletedItem){
        return res.status(404).json({
                    msg: "Category not found "
                })
    }

    return res.status(200).json({
                    msg: " Category deleted successfully",
                    data:deletedItem
                    
                })

    } catch (error) {
          
        
        console.log('Error in deleteCategory controller', error)
        return res.status(500).json({
            msg: "Error in deleteCategory controller",
            error: error||error
        })
    }
 }
    
