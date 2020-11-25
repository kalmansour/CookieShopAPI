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

const run = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
