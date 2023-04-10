
const User = require("../models/userModel");
const Post = require("../models/postModel");

async function createUser(req, res) {
  try {
    const { name, email, bio } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email is already registered" });
    }

    const user = new User({ name, email, bio });

    await user.save();

    return res.status(201).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}


async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ user_id:req.params.id })
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send({user, posts});
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

async function updateUserById(req, res) {
  try {
    const {name,bio}= req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: name, bio: bio },
      { new: true }
    )
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}
async function deleteUserById(req, res) {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
     res.status(404).send('User not found');
    }
    await Post.deleteMany({ user_id: user._id });
    await User.deleteOne({ _id: user._id });
   res.send('User and their posts deleted successfully');
  } catch (error) {
    console.error(error.message);
  }
}

async function findUserByEmail(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({error: "Email not found" });
    } else {
      res.status(200).send({ success: true, user });
    }
  } catch (err) {
    res.status(500).send({ error: "Server Error" });
  }
}

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  findUserByEmail,
};
