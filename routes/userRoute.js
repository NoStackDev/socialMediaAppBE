const router = require('express').Router()

const { createUser, login, getUser, getUsers, updateUser, deleteUser, followUser, unfollowUser } = require('../controllers/userController')

router.route('/signup').post(createUser)
router.route('/signin').post(login)
router.route('/users').get(getUsers)
router.route('/users/:id').get(getUser).post(updateUser).put(updateUser).delete(deleteUser)
router.route('/users/:id/follow').post(followUser)
router.route('/users/:id/unfollow').post(unfollowUser)


module.exports = router
