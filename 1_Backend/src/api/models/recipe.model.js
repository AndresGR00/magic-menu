const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: false },
  unit: {
    type: String,
    enum: ["kg","g","mg","l","dl","cl", "ml",],
    required: false,
  },
});

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    mainIngredient: {
      type: String,
      enum: [
        "meat",
        "fish",
        "pasta",
        "legume",
        "cereal",
        "fruit",
        "vegetable",
        "mushroom",
        "egg",
        "nut",
        "seed",
        "diary",
      ],
      required: true,
    },
    ingredients: [ingredientSchema],
    picture: { type: String, required: false, trim: true },
    rating: {
      type: Number,
      required: false,
      trim: true,
      enum: [1, 2, 3, 4, 5],
    },
    difficulty: {
      type: Number,
      required: false,
      trim: true,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    time: {
      type: Number,
      validate: {
        validator: function (value) {
          return value % 5 === 0;
        },
        message: "Time must be a multiple of 5",
      },
    },
    tags: [{ type: String }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    defaultRecipe: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    collection: "recipes",
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema, "recipes");
module.exports = Recipe;
