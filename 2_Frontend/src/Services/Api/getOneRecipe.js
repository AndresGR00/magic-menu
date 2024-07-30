import axios from "axios";
const API_URL_LOGIN = "http://localhost:3000/api/v1";

export const getOneRecipe = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL_LOGIN}/recipe/${recipeId}`);
    return response.data
  } catch (error) {
    return error
  }
};

