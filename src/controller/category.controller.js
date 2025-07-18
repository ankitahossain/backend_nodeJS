const { validateBody } = require("../helpers/validator")
const categoryModel = require("../models/category.model")


// CREATE CATEGORY
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

// GET ALL CATEGORIES
exports.getAllCategory = async (req, res) => {
    try {

        const allCategory = await categoryModel.find({})
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