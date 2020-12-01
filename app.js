const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bakeryRoutes = require("./routes/bakeries");
const cookieRoutes = require("./routes/cookies");
const db = require("./db/models");
const path = require("path");

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/bakeries", bakeryRoutes);
app.use("/cookies", cookieRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

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
