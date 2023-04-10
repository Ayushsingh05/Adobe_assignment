const express = require("express");
const {
  getTotalUsers,
  getTotalPosts,
  getTopActiveUsers,
} = require("../controller/analyticsController");

const router = express.Router();

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.get("/users", asyncHandler(getTotalUsers));

router.get("/users/top-active", asyncHandler(getTopActiveUsers));

router.get("/posts", asyncHandler(getTotalPosts));


module.exports = router;
