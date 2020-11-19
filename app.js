const express = require("express");
const cookies = require("./cookies");

const app = express();

const cors = require("cors");

app.use(cors());

app.get("/cookies", (req, res) => {
  res.json(cookies);
});

app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
