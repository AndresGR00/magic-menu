const mongoose = require("mongoose");

const mainIngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  },
  {
    timestamps: true,
    collection: "mainIngredients",
  }
);

const MainIngredient = mongoose.model(
  "MainIngredient",
  mainIngredientSchema,
  "mainIngredients"
);
module.exports = MainIngredient;