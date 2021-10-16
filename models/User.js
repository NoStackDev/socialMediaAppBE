const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePic: {
        type: String,
        default: ""
    },
    coverPic: {
        type: String,
        default: ""
    },
    desc: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model("User", UserSchema)
