const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        min: [5, "atleast 5 characters required"],
        max: [20, "maximum 20 characters allowed"],
    },
    email: {
        type: String,
        required: true,
        trim: true,

    },
    avatar: {
        type: String,
        trim: true,
    },
    password: {

        type: String,
        required: true,
        trim: true,
        min: [8, "atleast 8 characters required"],

    },
    lastLogin: {
        type: Date,
        trim: true,

    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        max: [11, "maximum 11 digits required"],

    },
    presentAddress: {
        type: String,
        trim: true,

    },
    permanentAddress: {
        type: String,
        trim: true,

    }
}
    , {
        timestamps: true,
    })

module.exports = mongoose.model("user", userSchema)