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


/* 

Al agregar o actualizar una receta en tu modelo de receta, también deberías actualizar el modelo de "Main Ingredient" 
para asegurarte de que las recetas estén correctamente asociadas con sus ingredientes principales correspondientes.

Por ejemplo, al crear una nueva receta con un ingrediente principal específico, deberías agregar la referencia de esa 
receta al documento del ingrediente principal correspondiente. Y si eliminas una receta, deberías eliminar su referencia 
del documento del ingrediente principal correspondiente.

*/