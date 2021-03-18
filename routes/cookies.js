const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
  cookieList,
  cookieUpdate,
  cookieDelete,
  fetchCookie,
} = require("../controllers/cookieController");

// Param Middleware
router.param("cookieId", async (req, res, next, cookieId) => {
  const cookie = await fetchCookie(cookieId, next);
  if (cookie) {
    req.cookie = cookie;
    next();
  } else {
    const err = new Error("Cookie Not Found");
    err.status = 404;
    next(err);
  }
  // console.log(`The value of cookieId is ${cookieId}`);
});

// Cookie List
router.get("/", cookieList);

// Cookie Delete
router.delete("/:cookieId", cookieDelete);

// Cookie Update
router.put("/:cookieId", upload.single("image"), cookieUpdate);

module.exports = router;
