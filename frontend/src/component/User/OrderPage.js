import React, { useState, useEffect, Fragment } from "react";
import Header from "../Header/Header";
import "./OrderPage.css";
import axios from "axios";
import { loadUser } from "../../Redux/userAction";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import { getOrder } from "../../Redux/Order/orderAction";

const OrderPage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, order } = useSelector((state) => state.order);
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getOrder());
  }, []);
  return (
    <div>
      <Header />
      <div className="orderMain">
        <h2>Orders</h2>
        <div className="orderContent">
          {order !== null &&
          order.Items !== undefined &&
          order.Items.length > 0 ? (
            order.Items.map((each) => (
              <div className="orderCard">
                <div className="orderOtherInfo">
                  <p>Quantity : {each.count}</p>
                  <p>Net total : ₹{each.totalprice}</p>
                </div>
                <div className="orderMainInfo">
                  <p>{each.mainitem.item}</p>
                  <p>₹{each.mainitem.price} per item</p>
                  <p>{each.canteen}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No Orders Are Made</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
