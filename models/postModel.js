const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    heading:{
      type: String,
      required: true,
      maxlength: 80,
    },
    image:{
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 300,
    },
    like_data:[{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
   }],
    likes: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
