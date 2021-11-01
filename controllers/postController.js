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
        
        if (req.body.repostOf) {
            console.log(req.body.repostOf)
            const originalPost = await Post.findById(req.body.repostOf)

            if (!originalPost) {
                res.status(404).json({ "message": "original post does not exist" })
            }

            originalPost.reposts.push(newPost._id)
            await originalPost.save()
        }

        user.posts.push(newPost._id)
        await user.save()
        await newPost.save()

        res.status(200).json({ "message": "success", "post": newPost })
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// get a post
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id) 
        
        if (!post) {
            res.status(404).json({ "message": "post does not exist" })
        }

        res.status(200).json({ "message": "success", "data": post })
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})

        if (posts.length === 0) {
            res.status(404).json({ "message": "there are no posts" })
        }

        res.status(200).json({ "message": "success", "data": posts })
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// update post
const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true})

        if (!updatedPost) {
            res.status(404).json({ "message": "post does not exist" })
        }

        res.status(200).json({ "message": "success", "data": updatedPost })
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// delete post
const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndUpdate(req.params.id, { "isDeleted": true, 
            "comment": null, 
            "img": null, 
            "userId": null, 
            "likedBy": null,
            "likes": null }, { new: true })

        if (!deletedPost) {
            res.status(404).json({ "message": "post does not exist" })
        }

        const user = await User.findById(deletedPost.userId)

        if (!user) {
            res.status(200).json({ "message": "post deleted, user does not exist" })
        }

        user.posts.pull(deletedPost._id)
        await user.save()

        res.status(200).json({ "message": "success", "data": deletedPost })

    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// like a post
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            res.status(404).json({ "message": "post does not exist" })
        }
        const user = await User.findById(req.body.userId)
        
        if (!user) {
            res.status(404).json({ "message": "user does not exist" })
        }

        if (user.posts.includes(post._id)) {
            res.status(404).json({ "message": "request not allowed" }) 
        }
        
        if (!user.likedPosts.includes(post._id)) {
            post.likes += 1
            post.likedBy.push(user._id)
            user.likedPosts.push(post._id)
        } else {
            post.likes -= 1
            post.likedBy.pull(user._id)
            user.likedPosts.pull(post._id)
        }

        await post.save()
        await user.save()

        res.status(200).json({ "message": "success", "data": post })
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// get timeline posts 
const getTimeline = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        const userPosts = await Post.find({ userId: user._id })
        const followingPosts = await Promise.all(
            user.following.map((followingId) => {
                return Post.find({ userId: followingId })
            })
        )
        const data = userPosts.concat(...followingPosts)
        res.status(200).json({ "message": "success", data })
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

module.exports = {
    createPost,
    getPost,
    getAllPosts,
    updatePost,
    deletePost,
    likePost,
    getTimeline
}

