// services/templateService.js
const ExcelJS = require('exceljs');
/* const path = require('path'); */
const fs = require('fs');

const createRecipeTemplateWorkbook = () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("RecipesTemplate");

  worksheet.columns = [
    { header: "title", key: "title", width: 30 },
    { header: "description", key: "description", width: 50 },
    { header: "mainIngredient", key: "mainIngredient", width: 20 },
    { header: "ingredients", key: "ingredients", width: 50 },
    { header: "rating", key: "rating", width: 10 },
    { header: "difficulty", key: "difficulty", width: 10 },
    { header: "time", key: "time", width: 10 },
    { header: "tags", key: "tags", width: 30 },
  ];

  worksheet.addRow({
    title: "Example Title",
    description: "Example Description",
    mainIngredient: "meat",
    ingredients: "30gr chicken, 100gr rice",
    rating: 5,
    difficulty: 3,
    time: 60,
    tags: "dinner, healthy",
  });

  worksheet.getRow(1).font = { bold: true };

  return workbook;
};

const saveWorkbookToFile = async (workbook, filePath) => {
  await workbook.xlsx.writeFile(filePath);
};

const deleteFile = (filePath) => {
  fs.unlinkSync(filePath);
};

module.exports = {
  createRecipeTemplateWorkbook,
  saveWorkbookToFile,
  deleteFile,
};
