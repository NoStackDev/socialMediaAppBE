const Post = require("../models/Post")
const User = require("../models/User")


// create post 
const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body)
        const user = await User.findById(req.body.userId)

        if (!user) {
            res.status(404).json({ "message": "user does not exist" })
        }

        user.posts.push(newPost._id)
        await user.save()
        await newPost.save()

        res.status(200).json({ "message": "success", "post": newPost })
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}


module.exports = {
    createPost
}

