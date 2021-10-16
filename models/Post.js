const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    img: {
        type: String,
    },
    comment: {
        type: String,
        min: 1,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    reposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    isRepost: {
        type: Boolean,
        default: false
    },
    isReply: {
        type: Boolean,
        default: false
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)
