import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const generateRandomRecipe = async (userId) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/user/${userId}`);
    const idsArray = response.data.recipes.map((recipe) => recipe._id)
    const randomId = idsArray[Math.floor(Math.random() * idsArray.length)];
    return randomId
  } catch (error) {
    console.error(error);
  }
};
