const router = require("express").Router();
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getTimeline,
} = require("../controllers/postController");

router.route("/posts").post(createPost).get(getAllPosts);
router
  .route("/posts/:id")
  .get(getPost)
  .post(updatePost)
  .put(updatePost)
  .delete(deletePost);
router.route("/posts/:id/like").post(likePost);
router.route("/posts/timeline/:userId").get(getTimeline);

module.exports = router;
