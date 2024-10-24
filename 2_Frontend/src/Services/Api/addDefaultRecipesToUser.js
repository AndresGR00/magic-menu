import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const getDefaultRecipes = async () => {
  try {
    const response = await axios.get(`${VITE_API_URL}/all-recipes`);
    const allRecipes = response.data;

    const defaultRecipes = allRecipes.filter(
      (recipe) => recipe.defaultRecipe === true
    );
    return defaultRecipes;
  } catch (error) {
    console.error("Error fetching default recipes:", error);
    return [];
  }
};

const addRecipeToUser = async (userId, recipeId) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/add-a-recipe`, {
      userId,
      recipeId,
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding recipe ${recipeId} to user ${userId}:`, error);
  }
};

export const addDefaultRecipesToUser = async (userId) => {
  try {
    const defaultRecipes = await getDefaultRecipes();

    for (const recipe of defaultRecipes) {
      await addRecipeToUser(userId, recipe._id);
    }
    alert("All default recipes have been added to the user. Please reload the page");
  } catch (error) {
    console.error(error);
  }
};
