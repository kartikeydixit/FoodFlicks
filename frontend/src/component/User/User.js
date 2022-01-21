import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./../Header/Header.js";
import "./User.css";
import axios from "axios";
import profile from "./../../asset/coverphoto.jpg";
import store from "../../Redux/store.js";
import { loadUser } from "../../Redux/userAction.js";
import { getCart } from "../../Redux/Order/orderAction.js";

import { Link } from "react-router-dom";
const User = () => {
  const { isAuthenticated, user } = useSelector((state) => {
    return state.user;
  });

  const { error, cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getCart());
  }, []);

  return (
    <Fragment>
      {isAuthenticated ? (
        <div>
          <Header />
          <div className="userMain">
            <div className="infoDiv">
              <img src={profile} />
              <p>Welcome {user.user.name}</p>
              <p>{user.user.email}</p>
              <p>
                <Link to="/order">Order Page</Link>
              </p>
            </div>
            <div className="cartDiv">
              <h2>Your Cart</h2>
              {loading === true ? (
                <p>Loading Cart..</p>
              ) : (
                <Fragment>
                  {cart != null &&
                  cart.cart != null &&
                  cart.cart.itemsDetail != undefined ? (
                    cart.cart.itemsDetail.map((each) => (
                      <div className="eachItem">
                        <div className="mainInfo">
                          <p>{each.mainitem.item}</p>
                          <p>₹{each.mainitem.price}</p>
                          <p>{each.canteen}</p>
                        </div>
                        <div className="otherInfo">
                          <p>Quantity : {each.count}</p>
                          <p> Total Price : ₹{each.totalprice}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Cart is Empty</p>
                  )}

                  <div className="infoFoter">
                    Total Amount :
                    {cart != null &&
                    cart.cart != null &&
                    cart.cart.itemsDetail != undefined ? (
                      <b> ₹{cart.cart.totalAmount}</b>
                    ) : (
                      <b>0</b>
                    )}
                    {cart != null &&
                    cart.cart != null &&
                    cart.cart.itemsDetail != undefined &&
                    cart.cart.totalAmount > 0 ? (
                      <div className="orderDiv">
                        <br />
                        <Link to="/payment">
                          <span>Procced To order</span>
                        </Link>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>Please Login First</h1>
      )}
    </Fragment>
  );
};

export default User;
