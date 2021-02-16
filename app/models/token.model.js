const { Schema, model } = require('mongoose')

const schema = new Schema({
    token: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: process.env.JWT_EXPIRES_IN || 3600
    },
    deletedAt: {
        type: Date,
        required: false,
    }
})

module.exports = {
    Token: model('Token', schema)
}