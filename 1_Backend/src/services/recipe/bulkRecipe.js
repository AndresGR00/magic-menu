const ExcelJS = require("exceljs");
const fs = require("fs");
const { RECIPE_ICONS } = require("../../utils/recipeIcons");
const Recipe = require("../../api/models/recipe.model");
const MainIngredient = require("../../api/models/mainIngredient.model");
const User = require("../../api/models/user.model");

const parseIngredients = (ingredientString) => {
  return ingredientString.split(",").map((ingredient) => {
    const [quantity, ...nameParts] = ingredient.trim().split(" ");
    const name = nameParts.join(" ");
    const unit = quantity.match(/[a-zA-Z]+/g)?.[0];
    const numericQuantity = parseFloat(quantity.match(/[0-9.]+/g)?.[0]);
    return { name, quantity: numericQuantity, unit };
  });
};

const getPictureUrl = (mainIngredient) => {
  const icon = RECIPE_ICONS.find((icon) => icon.key === mainIngredient);
  return icon ? icon.url : "";
};

const addRecipesToMainIngredient = async (recipes) => {
  for (const recipe of recipes) {
    const mainIngredientDoc = await MainIngredient.findOne({
      name: recipe.mainIngredient,
    });
    if (mainIngredientDoc) {
      mainIngredientDoc.recipes.push(recipe._id);
      await mainIngredientDoc.save();
    } else {
      console.error(`Main ingredient "${recipe.mainIngredient}" not found`);
    }
  }
};

const addRecipesToUser = async (userId, recipes) => {
  const user = await User.findById(userId);
  if (user) {
    const recipeIds = recipes.map((recipe) => recipe._id);
    user.recipes.push(...recipeIds);
    await user.save();
  } else {
    throw new Error(`User with ID "${userId}" not found`);
  }
};

const createRecipesFromWorksheet = (worksheet, userId) => {
  const recipes = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const rowData = row.values;
      const mainIngredient = rowData[3].toLowerCase();
      const ingredients = rowData[4] ? parseIngredients(rowData[4]) : [];
      const picture = getPictureUrl(mainIngredient);

      const recipe = {
        title: rowData[1],
        description: rowData[2],
        mainIngredient: mainIngredient,
        picture: picture,
        ingredients: ingredients,
        rating: rowData[5],
        difficulty: rowData[6],
        time: rowData[7],
        tags: rowData[8] ? rowData[8].split(",").map((tag) => tag.trim().toLowerCase()) : [],
        createdBy: userId,
        defaultRecipe: false, //Cambiar cuando suba las predeterminadas
      };

      recipes.push(recipe);
    }
  });
  return recipes;
};

const handleFileUpload = async (filePath, userId) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1);
  const recipesData = createRecipesFromWorksheet(worksheet, userId);
  const createdRecipes = await Recipe.insertMany(recipesData);
  await addRecipesToMainIngredient(createdRecipes);
  await addRecipesToUser(userId, createdRecipes);
  fs.unlinkSync(filePath);
  return createdRecipes;
};

module.exports = {
  handleFileUpload,
};
