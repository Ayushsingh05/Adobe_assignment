const Joi = require("joi");
const User = require("../models/userModel");

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
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}

async function updateUserById(req, res) {
  try {
    const { value, error } = await userSchema.validateAsync(req.body, {
      stripUnknown: true,
    });
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const user = await User.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
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
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
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
