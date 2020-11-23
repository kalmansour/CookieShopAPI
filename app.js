const express = require("express");
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();
const cors = require("cors");
const cookieRoutes = require("./routes/cookies");

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/cookies", cookieRoutes);

app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
