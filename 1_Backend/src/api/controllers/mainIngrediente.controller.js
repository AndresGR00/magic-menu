const MainIngredient = require("../models/mainIngredient.model");
const { handleResponse } = require("../../utils/handleResponse");

//Get All
const getAllMainIngredients = async (req, res, next) => {
  try {
    const allMainIngredients = await MainIngredient.find();
    return handleResponse(res, 200, allMainIngredients);
  } catch (error) {
    return handleResponse(res, 404, "Main ingredients not found");
  }
};

//Get Main Ingredient By iD
const getMainIngredientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mainIngredient = await MainIngredient.findById(id).populate(
      "recipes"
    );
    return mainIngredient
      ? handleResponse(res, 200, mainIngredient)
      : handleResponse(
          res,
          404,
          "No main ingredient has been found with this id"
        );
  } catch (error) {
    return handleResponse(res, 404, error);
  }
};

//Post
const createMainIngredient = async (req, res, next) => {
  try {
    const newMainIngredient = new MainIngredient({
      name: req.body.name,
      recipes: req.body.recipes,
    });
    const createNewMainIngredient = await newMainIngredient.save();
    return handleResponse(res, 201, createNewMainIngredient);
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};

// Post - Add recipe to the array of main ingredients
const addRecipeToMainIngredient = async (req, res, next) => {
  try {
    const { recipeId, mainIngredientId } = req.body; //Decidir si lo saco de body o params
    const mainIngredient = await MainIngredient.findById(mainIngredientId);
    mainIngredient.recipes.push(recipeId);
    await mainIngredient.save();
    return handleResponse(res, 200, "Recipe added properly");
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};

//Put
/* const editMainIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingMainIngredient = await MainIngredient.findById(id);
    const recipes = req.body.recipes || [];

    const editedMainIngredient = new MainIngredient(req.body);
    editedMainIngredient._id = id;

    if (req.body.recipes.length > 0) {
      editedMainIngredient.recipes = [
        ...existingMainIngredient.recipes,
        ...recipes,
      ];
    } else {
      editMainIngredient.recipes = [];
    }
    const updatedMainIngredient = await MainIngredient.findByIdAndUpdate(
      id,
      editedMainIngredient,
      {
        new: true,
      }
    );
    return handleResponse(res, 200, updatedMainIngredient);
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, error);
  }
}; */

//Delete - Delete recipe from the array of mainIngredient
const removeRecipeFromMainIngredient = async (req, res, next) => {
  try {
    const { recipeId, mainIngredientId } = req.body; //Decidir si lo saco de body o params
    const mainIngredient = await MainIngredient.findById(mainIngredientId);
    mainIngredient.recipes = mainIngredient.recipes.filter(
      (id) => id.toString() !== recipeId.toString()
    );
    await mainIngredient.save();
    return handleResponse(res, 200, "Recipe deleted properly");
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};

//Delete
const deleteMainIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;
    await MainIngredient.findByIdAndDelete(id);
    return handleResponse(res, 200, "Main ingredient deleted");
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};

module.exports = {
  getAllMainIngredients,
  getMainIngredientById,
  createMainIngredient,
  addRecipeToMainIngredient,
  removeRecipeFromMainIngredient,
  deleteMainIngredient,
};
