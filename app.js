const express = require("express");
const bodyParser = require("body-parser");
const slugify = require("slugify");

let cookies = require("./cookies");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.post("/cookies", (req, res) => {
  const id = cookies[cookies.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newCookie = { id, slug, ...req.body }; // id, slug are equivalent to id: id, slug: slug
  cookies.push(newCookie);
  res.status(201).json(newCookie);
});

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
