const Post = require("../models/postModel");
const User = require("../models/userModel");

async function getTotalUsers(req, res) {
  try {
    const count = await User.countDocuments();
    return res.status(200).send({ count });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

async function getTopActiveUsers(req, res) {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "user_id",
          as: "posts",
        },
      },
      { $project: { name: 1, postCount: { $size: "$posts" } } },
      { $sort: { postCount: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function getTotalPosts(req, res) {
  try {
    const count = await Post.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function getTopLikedPosts(req, res) {
  try {
    const posts = await Post.find().sort({ likes: -1 }).limit(5);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  getTotalUsers,
  getTopActiveUsers,
  getTotalPosts,
  getTopLikedPosts,
};
