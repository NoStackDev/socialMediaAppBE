const router = require('express').Router()
const { createPost } = require('../controllers/postController')

router.route('/posts').post(createPost)

module.exports = router
