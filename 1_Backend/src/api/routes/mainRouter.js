const mainRouter = require("express").Router();
const userRouter = require("../routes/user.router");
const mainIngredientRouter = require("../routes/mainIngredient.router");
const recipeRouter = require("../routes/recipe.router");

mainRouter.use("/", userRouter);
mainRouter.use("/", mainIngredientRouter);
mainRouter.use("/", recipeRouter);

module.exports = mainRouter;