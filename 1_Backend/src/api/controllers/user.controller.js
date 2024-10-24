const User = require("../models/user.model");
const { handleResponse } = require("../../utils/handleResponse");
const { generateSign } = require("../../config/jwt");
const bcrypt = require("bcrypt");

//Get All
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate("recipes");
    return handleResponse(res, 200, allUsers);
  } catch (error) {
    return handleResponse(res, 404, "Users not found");
  }
};

//Get User By Id
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("recipes");
    return user
      ? handleResponse(res, 200, user)
      : handleResponse(res, 404, "No user has been found with this id");
  } catch (error) {
    return handleResponse(res, 404, error);
  }
};

//Register a new user - Only allows register isUser
const createAnUser = async (req, res, next) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      rol: "isUser",
      recipes: req.body.recipes,
    });
    const userDuplicated = await User.findOne({ email: req.body.email });
    if (userDuplicated)
      return handleResponse(res, 400, "This email already exists");
    const createNewUser = await newUser.save();
    console.log(createNewUser);
    return handleResponse(res, 201, createNewUser);
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};

//Login user
const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return handleResponse(res, 400, "Email or password is incorrect");

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return handleResponse(res, 200, { user, token });
    } else {
      console.log(bcrypt.compareSync(req.body.password, user.password))
      return handleResponse(res, 400, "Email or password is incorrect");
    }
  } catch (error) {
    return handleResponse(res, 400, error);
  }
};

//Put
const editAnUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingUser = await User.findById(id);
    const recipes = req.body.recipes || [];

    const editedUser = new User(req.body);
    editedUser._id = id;
    editedUser.recipes = [...existingUser.recipes, ...recipes];
    const updatedUser = await User.findByIdAndUpdate(id, editedUser, {
      new: true,
    });
    return handleResponse(res, 200, updatedUser);
  } catch (error) {
    console.log(error)
    return handleResponse(res, 500, error);
  }
};

//Delete
const deleteAnUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return handleResponse(res, 200, "User deleted");
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};

const addRecipeToUser = async (req, res, next) => {
  try {
    const { userId, recipeId } = req.body; // Lo saco de body
    const user = await User.findById(userId);
    if (!user) return handleResponse(res, 404, "User not found");
    
    if (user.recipes.includes(recipeId)) {
      return handleResponse(res, 400, "Recipe already added to the user");
    }

    user.recipes.push(recipeId);
    await user.save();
    return handleResponse(res, 200, "Recipe added to the user");
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};

//Delete a recipe to user
const deleteRecipeToUser = async (req, res, next) => {
  try {
    const { userId, recipeId } = req.params; // Ver si saco de body o params
    const user = await User.findById(userId);
    if (!user) return handleResponse(res, 404, "User not found");

    const recipeIndex = user.recipes.indexOf(recipeId);
    if (recipeIndex !== -1) {
      user.recipes.splice(recipeIndex, 1);
      await user.save();
      return handleResponse(res, 200, "Recipe removed from the user");
    } else {
      return handleResponse(res, 404, "Recipe not found in user's recipes");
    }
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createAnUser,
  loginUser,
  editAnUser,
  deleteAnUser,
  addRecipeToUser,
  deleteRecipeToUser
};
