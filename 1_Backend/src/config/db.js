const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connected with success");
  } catch (error) {
    console.error("Error in the connection to the DB");
  }
};

module.exports = { connectDB }