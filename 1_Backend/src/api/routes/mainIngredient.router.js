const mainIngredientRouter = require("express").Router();
const mainIngredientController = require("../controllers/mainIngrediente.controller");
const { isAuth, isAdmin } = require("../../middlewares/auth")

mainIngredientRouter.get("/all-main-ingredients", mainIngredientController.getAllMainIngredients);
mainIngredientRouter.get("/main-ingredient/:id", mainIngredientController.getMainIngredientById);
mainIngredientRouter.post("/create-main-ingredient", [isAdmin], mainIngredientController.createMainIngredient);
mainIngredientRouter.delete("/delete-main-ingredient/:id", [isAdmin], mainIngredientController.deleteMainIngredient);
//mainIngredientRouter.put("/edit-main-ingredient/:id", mainIngredientController.editMainIngredient);

mainIngredientRouter.post("/add-recipe-to-main-ingredient", mainIngredientController.addRecipeToMainIngredient);
mainIngredientRouter.delete("/delete-recipe-from-main-ingredient", mainIngredientController.removeRecipeFromMainIngredient);

module.exports = mainIngredientRouter;