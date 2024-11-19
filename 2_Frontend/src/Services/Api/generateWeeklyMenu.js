import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const generateWeeklyMenu = async (userId) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/weekly-menu`, {
      userId
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
