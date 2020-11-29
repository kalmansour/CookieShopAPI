const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieRoutes = require("./routes/cookies");
const db = require("./db/models");

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/cookies", cookieRoutes);

//NOT FOUND PATH MIDDLEWARE

app.use((req, res, next) => {
  res.status(404).json({ message: "PATH NOT FOUND!" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
