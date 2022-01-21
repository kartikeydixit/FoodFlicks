import React, { Fragment, useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import axios from "axios";
import { loadUser } from "../../Redux/userAction";
import { getCart } from "../../Redux/Order/orderAction";
import { useNavigate } from "react-router-dom";
const PaymentGateway = () => {
  const { isAuthenticated, user } = useSelector((state) => {
    return state.user;
  });
  const navigate = useNavigate();
  const { error, cart, loading } = useSelector((state) => state.cart);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getCart());
  }, []);

  const makePayment = (token) => {
    const body = {
      token,
      cart: cart.cart,
    };

    axios
      .post("http://localhost:4000/api/v3/stripepayment", body, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        //call further methods
        alert(
          `Payment is Successfull.₹${cart.cart.totalAmount} is Deducted from Your account `
        );
        setPaymentSuccess(true);
        axios
          .post("http://localhost:4000/api/v3/clearcart", body, {
            headers: {
              "x-access-token": localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          })
          .then((result) => {
            console.log(
              "addToOrder Route and emptyCart route succesfully executed"
            );
            navigate("/");
          })
          .catch((errr) => {
            console.log(errr);
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Fragment>
      {isAuthenticated ? (
        <div className="paymentMain">
          {cart != null &&
          cart.cart != null &&
          cart.cart.itemsDetail != undefined ? (
            <div>
              <StripeCheckout
                stripeKey="pk_test_51Jx58ASB7KtvKWR9km2oh8aLUDXaTRbDTs2A3LyRPqE93wZvES88wnZl4y7504Vuieao0Jh9GjH71JcbGkfvWl1x00DtSmkm4P"
                token={makePayment}
                name="Purchase Order"
              />
            </div>
          ) : (
            <p>Cart is empty</p>
          )}
        </div>
      ) : (
        <h1>Please Login First</h1>
      )}
    </Fragment>
  );
};

export default PaymentGateway;
