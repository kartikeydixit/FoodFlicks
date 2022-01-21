import React, { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { addCart } from "../../Redux/Order/orderAction";
import "./CanteenPage.css";

const Menu = (props) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const handlePlus = () => {
    setCount((prev) => {
      return prev + 1;
    });
  };

  const handleMinus = () => {
    if (count > 0) {
      setCount((prev) => {
        return prev - 1;
      });
    }
  };

  const handleOrder = (Each) => {
    const each = Each.each;
    const canteen = Each.canteen;
    const totalprice = count * each.price;
    console.log(
      `${count} Pieces of ${each.item} is ordered and price of each item is ${each.price}`
    );
    let cartBody = {
      itemsDetail: {
        mainitem: {
          item: each.item,
          price: each.price,
        },
        count: count,
        totalprice: totalprice,
        canteen: canteen, // This is reamainng
      },
    };

    console.log(cartBody);
    dispatch(addCart(cartBody));
    setCount(0);
  };
  return (
    <div>
      <div className="eachMenu">
        <div className="detailbar">
          <h3>{props.item}</h3>
          <p>₹{props.price}</p>
        </div>

        <div className="orderbar">
          <span className="plus" onClick={handlePlus}>
            +
          </span>
          <span className="count">{count}</span>
          <span className="minus" onClick={handleMinus}>
            -
          </span>
          <p className="orderBtn" onClick={() => handleOrder(props)}>
            Order
          </p>
          {}
        </div>
      </div>
    </div>
  );
};

export default Menu;
