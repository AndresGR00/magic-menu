import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getRecipesFromAnUser = async (userId) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/user/${userId}`);
    return response.data.recipes;
  } catch (error) {
    console.error(error);
  }
};
