import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getRecipesBulkTemplate = async () => {
  try {
    // Archivo Blob
    const response = await axios.get(`${VITE_API_URL}/get-recipe-template`, {
      responseType: "blob",
    });

    // Enlace temporal para la descarga
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "recipes_template.xlsx");
    document.body.appendChild(link);
    link.click();

    // Limpiamos el enlace temporal
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error downloading the file", error);
  }
};


/* 

Un Blob (Binary Large Object) en JavaScript es un objeto que representa datos binarios en bruto. 
Se utiliza para almacenar y manipular archivos y otros datos binarios, como imágenes, videos o documentos, en el navegador. 
Los Blob permiten manejar datos binarios en aplicaciones web de una manera eficiente, como si estuvieras trabajando con archivos locales.

*/