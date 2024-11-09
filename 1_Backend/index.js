require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const cors = require("cors");
const mainRouter = require("./src/api/routes/mainRouter");

const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();
app.disable("x-powered-by");


app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use('/api/V1', mainRouter);

app.use("*", (req, res, next) => {
  res.status(404).send("<h1> 404 Not found</h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app