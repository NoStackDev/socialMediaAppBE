const bcrypt  = require('bcrypt')
const User = require("../models/User")


// create user
const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body)
        const hash = await bcrypt.hash(req.body.password, 10)
        newUser.password = hash
        await newUser.save()
        const { password, ...data } = newUser._doc
        res.status(200).json({ "message": "success", data })
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// login user
const login = async (req, res) => {
    try { 
        const user = await User.findOne({ email: req.body.email })

        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const { password, ...data } = user._doc
            res.status(200).json({ "message": "success", data })
        } else { res.status(404).json({ "message": "email or password is incorrect" }) }

    } catch (err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// get single user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            res.status(404).json({ "message": "user does not exist" })
        } 

        const { password, ...data } = user._doc
        res.status(200).json({ "message": "success", data })
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// get users
const getUsers = async (req, res) => {
    try {
        let users = await User.find({})
        
        if (users.length === 0) {
            res.status(404).json({ "message": "there are no users" })
        } 

        const data = users.map( (user) => {
            const { password, ...others } = user._doc
            return others
        })

        res.status(200).json({ "message": "success", data })
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// update user
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!user) {
            res.status(404).json({ "message": "user does not exist" })
        } 

        const { password, ...data } = user._doc
        res.status(200).json({ "message": "success", data })
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) { 
            res.status(404).json({ "message": "user does not exist" })
        } 

        if (user.following.length > 0) {
            const newfollowingArray = user.following.map( async (followedUserId) => {
                const followedUser = await User.findById(followedUserId)
                followedUser.followers.pull(user._id)
                await followedUser.save()
                return followedUserId
            })
        }

        if (user.followers.length > 0) {
            const newFollowersArray = user.followers.map( async (followerId) => {
                const follower = await User.findById(followerId)
                follower.following.pull(user._id)
                await follower.save()
                return follower
            })
        }

        const { password, ...data } = user._doc
        res.status(200).json({ "message": "success", data })
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// follow/unfollow a user
const followUser = async (req, res) => {
    try {
        const { followedUserId } = req.body
        const user = await User.findById(req.params.id)
        const followedUser = await User.findById(followedUserId)

        if (user._id.toString() === followedUser._id.toString()) {
            res.status(200).json({ "message": "can't follow or unfollow self" })
        }

        if (!followedUser || !user) {
            res.status(404).json({ "message": "user does not exist" })
        }

        if (user.following.includes(followedUser._id)) {
            res.status(200).json({ "message": "already following user" })
        }

        if (!user.following.includes(followedUser._id)) {
            user.following.push(followedUser._id)
            followedUser.followers.push(user._id)
        } else {
        user.following.pull(followedUser._id)
        followedUser.followers.pull(user._id)
        }

        const { password, ...data } = user._doc
        await user.save()
        await followedUser.save()

        res.status(200).json({ "message": "success", data }) 
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

module.exports = {
    createUser,
    login,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    followUser,
}
