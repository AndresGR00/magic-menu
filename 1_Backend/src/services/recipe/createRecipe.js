const Recipe = require("../../api/models/recipe.model");
const MainIngredient = require("../../api/models/mainIngredient.model");
const User = require("../../api/models/user.model");
const { RECIPE_ICONS } = require("../../utils/recipeIcons");
const { handleResponse } = require("../../utils/handleResponse");

const getRecipeIcon = (mainIngredient) => {
  const icon = RECIPE_ICONS.find(
    (icon) => icon.key === mainIngredient.toLowerCase()
  );
  return icon ? icon.url : "";
};

const creatingRecipe = async () => {
  const picture = getRecipeIcon(recipeData.mainIngredient);
  const newRecipe = new Recipe({
    ...recipeData,
    mainIngredient: recipeData.mainIngredient.toLowerCase(),
    picture: picture,
  });
  return await newRecipe.save();
};
const addRecipeToMainIngredient = async (mainIngredient, recipeId) => {
  const mainIngredientDoc = await MainIngredient.findOne({
    name: mainIngredient.toLowerCase(),
  });
  if (mainIngredientDoc) {
    mainIngredientDoc.recipes.push(recipeId);
    await mainIngredientDoc.save();
  } else {
    return handleResponse(
      res,
      404,
      `Main ingredient "${req.body.mainIngredient}" not found`
    );
  }
};
const addUserRecipe = async (userId, recipeId) => {
  const user = await User.findById(userId);
  if (user) {
    user.recipes.push(recipeId);
    await user.save();
  } else {
    return handleResponse(
      res,
      404,
      `User with ID "${req.body.createdBy}" not found`
    );
  }
};

module.exports = { creatingRecipe, addRecipeToMainIngredient, addUserRecipe };
