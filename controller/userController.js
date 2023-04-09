const Joi = require("joi");
const User = require("../models/userModel");

const userSchema = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  bio: Joi.string().max(200).allow(),
});

async function createUser(req, res) {
  try {
    const { value, error } = await userSchema.validateAsync(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const user = await User.create(value);
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
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
}


module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
