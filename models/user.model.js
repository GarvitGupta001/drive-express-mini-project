const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [3, "Username must be atleast 3 character long"],
        maxlength: [15, "Username cannot be more than 15 characters"],
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [10, "Email must be atleast 10 character long"]
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: [5, "Password must be atleast 5 character long"]
    }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel