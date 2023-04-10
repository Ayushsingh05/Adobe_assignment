const Post = require("../models/postModel");

async function getPosts(req, res) {
  try {
    const posts = await Post.find().populate("user_id");
    res.status(201).json(posts);
  } catch {
    res.status(400).send("Server Error");
  }
}

async function createPost(req, res) {
  try {
    const { user_id, content, heading, image } = req.body;
    const post = new Post({ user_id, content, heading, image });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).send("Server Error");
  }
}
async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function updatePostById(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) return res.status(404).send("Post not found");
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function deletePostById(req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.send("Post deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}
async function likePost(req, res) {
  try {
    const userId = req.body.userId;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 }, $addToSet: { like_data: userId } },
      { new: true }
    );
    if (!post) return res.status(404).send("Post not found");
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function unlikePost(req, res) {
  const userId = req.body.userId;
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { like_data: userId},
        $inc: { likes: -1 },
        
      },
      { new: true }
    );
    if (!post) return res.status(404).send("Post not found");
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
  likePost,
  unlikePost,
  getPosts,
};
