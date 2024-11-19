import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const addDefaultRecipesToUser = async (userId) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/add-default-recipes`, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding default recipes to user:`, error);
  }
};
