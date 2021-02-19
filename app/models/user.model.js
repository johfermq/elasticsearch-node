const { Schema, model } = require('mongoose')

const schema = Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        required: true,
        lowercase: true,
        minlength: 6,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    }
}, { timestamps: true })

module.exports = model('User', schema)