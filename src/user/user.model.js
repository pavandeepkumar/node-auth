const { default: mongoose } = require("mongoose");


const userModel = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const User = mongoose.model('User', userModel)

module.exports = User