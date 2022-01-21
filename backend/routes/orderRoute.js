const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  makePayment,
  addToOrder,
  emptyCart,
  getOrders,
} = require("./../controllers/orderController");
const { isAuthenticated } = require("../middleware/auth");
const { getRounds } = require("bcrypt");
router.route("/additem").post(isAuthenticated, addToCart);
router.route("/getcart").get(isAuthenticated, getCartItems);

router.route("/stripepayment").post(isAuthenticated, makePayment);
router.route("/clearcart").post(isAuthenticated, addToOrder, emptyCart);
router.route("/getorders").get(isAuthenticated, getOrders);
module.exports = router;
