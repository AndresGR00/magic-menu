import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const generateWeeklyMenu = async (userId) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/user/${userId}`);
    const idsArray = response.data.recipes.map((recipe) => recipe._id);

    const getRandomIds = (arr, num) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    };

    const randomIds = getRandomIds(idsArray, 7);
    return randomIds;
  } catch (error) {
    console.error(error);
  }
};
