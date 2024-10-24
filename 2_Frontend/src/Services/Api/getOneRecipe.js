import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getOneRecipe = async (recipeId) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/recipe/${recipeId}`);
    return response.data
  } catch (error) {
    return error
  }
};

