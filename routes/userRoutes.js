const express = require("express");
const {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  findUserByEmail,
} = require("../controller/userController");

const router = express.Router();

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post("/", asyncHandler(createUser));

router.get("/:id", asyncHandler(getUserById));

router.put("/:id", asyncHandler(updateUserById));

router.delete("/:id", asyncHandler(deleteUserById));

router.post("/login", asyncHandler(findUserByEmail));

module.exports = router;
