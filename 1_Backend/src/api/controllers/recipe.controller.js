const Recipe = require("../models/recipe.model");
const { handleResponse } = require("../../utils/handleResponse");
const { handleFileUpload } = require("../../services/recipe/bulkRecipe");
const {
  createRecipeTemplateWorkbook,
  getWorkbookBuffer,
} = require("../../services/recipe/getTemplate");
const {
  creatingRecipe,
  addRecipeToMainIngredient,
  addUserRecipe,
} = require("../../services/recipe/createRecipe");

//Get All
const getAllRecipes = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find().populate("createdBy");
    return handleResponse(res, 200, allRecipes);
  } catch (error) {
    return handleResponse(res, 404, "Recipes not found");
  }
};

//Get Recipe By Id
const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate(
      "mainIngredient",
      "createdBy"
    );
    return recipe
      ? handleResponse(res, 200, recipe)
      : handleResponse(res, 404, "No recipe has been found with this id");
  } catch (error) {
    return handleResponse(res, 404, error);
  }
};

//Get 7 recipes for weekly menu
const getWeeklyRecipes = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const randomRecipes = await Recipe.aggregate([
      { $match: { user: userId } },
      { $sample: { size: 7 } }
    ]);
    return handleResponse(res, 200, randomRecipes)
  } catch (error) {
    console.error(error);
    return handleResponse(res, 500, error)
  }
};

//Create a recipe and added to the main ingredient array
const createRecipe = async (req, res, next) => {
  try {
    const recipeData = {
      title: req.body.title,
      description: req.body.description,
      mainIngredient: req.body.mainIngredient,
      rating: req.body.rating,
      difficulty: req.body.difficulty,
      time: req.body.time,
      tags: req.body.tags,
      createdBy: req.body.createdBy,
      ingredients: req.body.ingredients,
      defaultRecipe: false,
    };
    const newRecipe = await creatingRecipe(recipeData);
    await addRecipeToMainIngredient(recipeData.mainIngredient, newRecipe._id);
    await addUserRecipe(recipeData.createdBy, newRecipe._id);

    return handleResponse(res, 201, newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    return handleResponse(res, 500, error);
  }
};

//Edit a not default recipe
const editRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingRecipe = await Recipe.findById(id);
    if (existingRecipe.defaultRecipe)
      return handleResponse(res, 403, "You cannot edit this recipe");

    const ingredients = req.body.ingredients || [];
    const tags = req.body.tags || [];

    const editedRecipe = await new Recipe(req.body);
    editedRecipe._id = id;
    editedRecipe.ingredients = [...existingRecipe.ingredients, ...ingredients];
    editedRecipe.tags = [...existingRecipe.tags, ...tags];
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, editedRecipe, {
      new: true,
    });
    return handleResponse(res, 200, updatedRecipe);
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};

//Delete not default recipe
const deleteARecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingRecipe = await Recipe.findById(id);
    if (existingRecipe.defaultRecipe)
      return handleResponse(res, 403, "You cannot delete this recipe");
    await Recipe.findByIdAndDelete(id);
    return handleResponse(res, 200, "Recipe deleted");
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};

//Get template
const getTemplateRecipe = async (req, res, next) => {
  try {
    const workbook = createRecipeTemplateWorkbook();
    /* const templatePath = path.join(__dirname, "recipes_template.xlsx"); */
    /* await saveWorkbookToFile(workbook, templatePath); */
    
    const buffer = await getWorkbookBuffer(workbook);

    /* res.download(templatePath, "recipes_template.xlsx", (error) => {
      if (error) {
        return handleResponse(res, 500, error);
      } else {
        deleteFile(templatePath);
      }
    }); */

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="recipes_template.xlsx"',
      'Content-Length': buffer.length
    });
    return res.send(buffer);
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};

//Post recipes with excel
const createBulkRecipes = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) return handleResponse(res, 400, "No file uploaded");

    const { userId } = req.body; //Ver si saco de body o params
    /* const createdRecipes = await handleFileUpload(file.path, userId);
    return handleResponse(
      res,
      200,
      "Recipes created successfully",
      createdRecipes
    ); */

    const createdRecipes = await handleFileUpload(file.buffer, userId);
    return handleResponse(res, 200, "Recipes created successfully", createdRecipes);
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};

module.exports = {
  getAllRecipes,
  getWeeklyRecipes,
  getRecipeById,
  createRecipe,
  editRecipe,
  deleteARecipe,
  getTemplateRecipe,
  createBulkRecipes,
};
