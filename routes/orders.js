const express = require("express");
const router = express.Router();
const passport = require("passport");

const { checkout, orderList } = require("../controllers/orderController");

router.get(
  "/orderlist",
  passport.authenticate("jwt", { session: false }),
  orderList
);

router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  checkout
);

module.exports = router;
