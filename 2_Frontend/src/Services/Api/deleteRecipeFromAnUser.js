import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const deleteRecipeFromAnUser = async (recipeId) => {
  try {
    const response = await axios.delete(`${VITE_API_URL}/delete-recipe/${recipeId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
