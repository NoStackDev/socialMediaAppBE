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
        } else {
            res.status(404).json({ "message": "email or password is incorrect" })
        }
    } catch (err) {
        res.status(500).json({ "message": "unsuccessful", "error": err.message })
    }
}

// get single user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            const { password, ...data } = user._doc
            res.status(200).json({ "message": "success", data })
        } else ( res.status(404).json({ "message": "user does not exist" }) )
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// get users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        if (users.length !== 0) {
            const data = users.map( (user) => {
                const { password, ...others } = user._doc
                return others
            })
            res.status(200).json({ "message": "success", data })
        } else { res.status(404).json({ "message": "there are no users" }) }
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// update user
const updateUser = async (req, res) => {
    try {
        const { password, ...others } = req.body
        const user = await User.findByIdAndUpdate(req.params.id, others, { new: true })
        if (user) {
            const { password, ...data } = user._doc
            res.status(200).json({ "message": "success", data })
        } else ( res.status(404).json({ "message": "user does not exist" }) )
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

// delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (user) { 
            const { password, ...data } = user._doc
            res.status(200).json({ "message": "success", data })
        } else ( res.status(404).json({ "message": "user does not exist" }) )
    } catch(err) { res.status(500).json({ "message": "unsuccessful", "error": err.message }) }
}

module.exports = {
    createUser,
    login,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}
