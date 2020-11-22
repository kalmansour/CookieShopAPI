const express = require("express");
let cookies = require("./cookies");

const app = express();

const cors = require("cors");

app.use(cors());

app.delete("/cookies/:cookieId", async (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  if (foundCookie) {
    cookies = cookies.filter((cookie) => cookie !== foundCookie);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
});

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
