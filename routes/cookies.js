const express = require("express");
const router = express.Router();

const {
  cookieCreate,
  cookieList,
  cookieUpdate,
  cookieDelete,
} = require("../controllers/cookieController");

/*** Routes ***/
router.post("/", cookieCreate);
router.get("/", cookieList);
router.put("/:cookieId", cookieUpdate);
router.delete("/:cookieId", cookieDelete);

module.exports = router;
