import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const registerAnUser = async (data) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
};
