import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const uploadBulkRecipes = async (file, userId) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    const response = await axios.post(`${VITE_API_URL}/create-recipe-bulk`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading the file', error);
    throw error;
  }
};
