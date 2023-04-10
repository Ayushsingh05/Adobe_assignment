const express = require("express");
const {
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
  likePost,
  unlikePost,
  getPosts,
} = require("../controller/postController");
const { getTopLikedPosts } = require("../controller/analyticsController");
const router = express.Router();

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post("/", asyncHandler(createPost));

router.get("/", asyncHandler(getPosts));

router.get("/:id", asyncHandler(getPostById));

router.put("/:id", asyncHandler(updatePostById));

router.delete("/:id", asyncHandler(deletePostById));

router.post("/:id/like", asyncHandler(likePost));

router.post("/:id/unlike", asyncHandler(unlikePost)); 

router.get("/analytics/top-liked", asyncHandler(getTopLikedPosts));

module.exports = router;
