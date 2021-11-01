const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    lastname: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dateOfBirth: {
        type: String,
        required: true
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
    country: {
        type: String,
        default: "",
        required: true
    },
    city: {
        type: String,
        default: "",
        required: true
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
