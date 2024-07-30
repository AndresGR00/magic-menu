import axios from "axios";

const API_URL_LOGIN = "http://localhost:3000/api/v1";

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL_LOGIN}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error;
  }
};
