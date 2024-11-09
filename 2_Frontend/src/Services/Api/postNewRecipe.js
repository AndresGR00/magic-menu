import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const createRecipe = async (recipeData) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/create-recipe`, recipeData);
    return response.data;
  } catch (error) {
    console.error("Error creating recipe:", error);
  }
};
