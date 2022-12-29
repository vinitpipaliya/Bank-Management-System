const mongoose = require('mongoose')
var Regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var NumRegex = /^([+]\d{2})?\d{10}$/


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50,
            unique: true,
            match: Regex
        },
        number: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 10,
            unique: true,
            match: NumRegex,
        }
    },
    { timestamps: true }
)
module.exports = mongoose.model("user", userSchema)