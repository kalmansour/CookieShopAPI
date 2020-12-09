const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  bakeryCreate,
  bakeryList,
  cookieCreate,
} = require("../controllers/bakeryController");
const upload = require("../middleware/multer");

// Bakery List
router.get("/", bakeryList);

// Bakery Create
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  bakeryCreate
);

// Cookie Create
router.post("/:bakeryId/cookies", upload.single("image"), cookieCreate);

module.exports = router;
