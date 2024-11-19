const recipeRouter = require("express").Router();
const recipeController = require("../controllers/recipe.controller");
const { isAuth, isAdmin } = require("../../middlewares/auth");
const multer = require('multer');
/* const upload = multer({ dest: 'uploads/' }); */
const upload = multer({ storage: multer.memoryStorage() });

recipeRouter.get("/all-recipes", recipeController.getAllRecipes);
recipeRouter.get("/weekly-menu", recipeController.getWeeklyRecipes);
recipeRouter.get("/recipe/:id", recipeController.getRecipeById);
recipeRouter.post("/create-recipe", recipeController.createRecipe);
recipeRouter.put("/edit-recipe/:id", recipeController.editRecipe);
recipeRouter.delete("/delete-recipe/:id", recipeController.deleteARecipe);

recipeRouter.get("/get-recipe-template", recipeController.getTemplateRecipe);
recipeRouter.post("/create-recipe-bulk", upload.single('file'), recipeController.createBulkRecipes);

module.exports = recipeRouter;
