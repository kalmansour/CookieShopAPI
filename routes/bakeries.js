const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  bakeryCreate,
  bakeryList,
  cookieCreate,
} = require("../controllers/bakeryController");
const upload = require("../middleware/multer");

//Param Middleware
router.param("bakeryId", async (req, res, next, bakeryId) => {
  const bakery = await fetchbakery(bakeryId, next);
  if (bakery) {
    req.bakery = bakery;
    next();
  } else {
    const err = new Error("Bakery Not Found");
    err.status = 404;
    next(err);
  }
  // console.log(`The value of bakeryId is ${bakeryId}`);
});

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
