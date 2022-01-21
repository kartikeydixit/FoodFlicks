const OrderCart = require("../models/orderModel");
const stripe = require("stripe")(
  "sk_test_51Jx58ASB7KtvKWR9TkZ9noQdj4cAwiKsKKOqdPO5pBMa8Rth0LmQx5ZMMorphoEPhPhJTdeGXFmqE0sJrQCglSQZ00WImfYrlS"
);
const { v4: uuidv4 } = require("uuid");

const Order = require("../models/ordersModel");

exports.addToCart = (req, res, next) => {
  req.body.user = req.user;
  OrderCart.findOne({ user: req.user }, (err, cart) => {
    if (err) {
      return res.json({
        error: "Some error occured,cannot add item to Cart",
      });
    }
    if (!cart) {
      // if cart is not yet created
      req.body.totalAmount = req.body.itemsDetail.totalprice;

      const orderCart = new OrderCart(req.body);
      orderCart.save((err, ordercart) => {
        if (err || !ordercart)
          return res.json({
            error: "Some error occured,cannot add item to Cart",
          });

        return res.json({
          ordercart,
        });
      });
    } else {
      var newTotalAmount = cart.totalAmount + req.body.itemsDetail.totalprice;
      var newItemsDeatil = [...cart.itemsDetail, req.body.itemsDetail];
      cart.totalAmount = newTotalAmount;
      cart.itemsDetail = newItemsDeatil;
      cart.save();
      return res.json({
        cart,
      });
    }
  });
};

exports.getCartItems = (req, res, next) => {
  OrderCart.findOne({ user: req.user }, (err, cart) => {
    if (err) {
      return res.json({
        error: "Some error Occured",
      });
    }

    return res.json({
      cart,
    });
  });
};

exports.makePayment = (req, res, next) => {
  const { cart, token } = req.body;
  console.log("Cart ", cart);
  const totalAmount = cart.totalAmount;
  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: totalAmount * 100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
          },
          { idempotencyKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err));
    });
};

exports.emptyCart = (req, res, next) => {
  OrderCart.findOne({ user: req.user }, (err, cart) => {
    if (err) {
      return res.json({
        error: "Some error occurred",
      });
    }

    cart.itemsDetail = [];
    cart.totalAmount = 0;
    cart.save((err, newcart) => {
      if (err) {
        return res.json({
          error: "Some error occurred",
        });
      }
      return res.json({ newcart });
    });
  });
};

exports.addToOrder = (req, res, next) => {
  Order.findOne({ user: req.user._id }, (err, order) => {
    if (err) {
      return res.json({
        error: "Some error Occured!",
      });
    }
    if (!order) {
      // Order DB is not empty for this user
      const body = {
        user: req.user._id,
        Items: req.body.cart.itemsDetail,
      };
      const newOrder = new Order(body);
      newOrder.save((err, neworder) => {
        if (err) {
          return res.json({
            error: "Some Error Occurred",
          });
        }

        next();
      });
    } else {
      // Ad this cart to previous added orders
      const newArray = [...order.Items, ...req.body.cart.itemsDetail];
      order.Items = newArray;
      order.save((err, neworder) => {
        if (err) {
          return res.json({
            error: "Some Error Occurred",
          });
        }

        next();
      });
    }
  });
};

exports.getOrders = (req, res, next) => {
  Order.findOne({ user: req.user._id }, (err, order) => {
    if (err) {
      return res.json({
        error: "some error occured",
      });
    }
    return res.json({
      order,
    });
  });
};
