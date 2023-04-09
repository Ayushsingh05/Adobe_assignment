const Joi = require("joi");
const Post = require("../models/postModel");

const postSchema = Joi.object({
  user_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  content: Joi.string().max(300).required(),
  likes: Joi.number().integer().min(0).default(0),
});

async function createPost(req, res) {
  try {
    const { user_id, content, likes } = await postSchema.validateAsync(
      req.body
    );
    const post = new Post({ user_id, content, likes });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request");
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
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: -1 }, $max: { likes: 0 } },
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
};
