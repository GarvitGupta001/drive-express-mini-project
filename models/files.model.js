const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: [true, "Original name is required"],
    },
    path: {
        type: String,
        required: [true, "Path is required"],
    },
    size: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "User is required"]
    }
})

const fileModel = mongoose.model('file', fileSchema)

module.exports = fileModel