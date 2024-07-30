require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const cors = require("cors");
const mainRouter = require("./src/api/routes/mainRouter");

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
};

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors(corsOptions));

connectDB();

app.use('/api/V1', mainRouter);

app.use("*", (req, res, next) => {
  res.status(404).send("<h1> 404 Not found</h1>");
});

app.listen(3000, () => {
  console.log("Server started in http://localhost:3000/");
});
