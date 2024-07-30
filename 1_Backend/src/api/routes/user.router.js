const userRouter = require("express").Router();
const userController = require("../controllers/user.controller");
const { isAuth, isAdmin } = require("../../middlewares/auth");

userRouter.get("/all-users", userController.getAllUsers);
userRouter.get("/user/:id", userController.getUserById);
userRouter.post("/register", userController.createAnUser);
userRouter.post("/login", userController.loginUser);
userRouter.put("/update-user/:id", userController.editAnUser);
userRouter.delete("/delete-user/:id", userController.deleteAnUser);

userRouter.post("/add-a-recipe", userController.addRecipeToUser);
userRouter.delete("/delete-a-recipe-from-user", userController.deleteRecipeToUser);

module.exports = userRouter;
