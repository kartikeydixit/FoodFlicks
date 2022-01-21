import React, { Fragment, useEffect, useState } from "react";
import "./CanteenPage.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCanteenById } from "../../Redux/canteenAction";
import Header from "../Header/Header";
import foodImg from "./../../asset/Food.jpg";
import "./CanteenPage.css";
import Menu from "./Menu";

const CanteenPage = ({ canteenState, fetchCanteenById }) => {
  const { id } = useParams();
  useEffect(() => {
    fetchCanteenById(id);
  }, []);

  const { loading, error } = canteenState;
  const { canteen } = canteenState.canteen;

  return (
    <Fragment>
      {!canteen ? (
        <h2>Loading....</h2>
      ) : (
        <div>
          <Header />
          <div className="canteenPageMain">
            <div className="canteenPageHeader">
              <img src={foodImg} />
              <span className="canteenName">{canteen.name}</span>
              <span className="location">{canteen.location}</span>
            </div>
            <div className="canteenPageMenu">
              {canteen.menu.map((each) => (
                <Menu
                  key={each._id}
                  item={each.item}
                  price={each.price}
                  id={each._id}
                  each={each}
                  canteen={canteen.name}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    canteenState: state.canteen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCanteenById: (id) => dispatch(fetchCanteenById(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CanteenPage);

/* 

<div key={each._id}>
                  <div className="eachMenu">
                    <div className="detailbar">
                      <h3>{each.item}</h3>
                      <p>₹{each.price}</p>
                    </div>

                    <div className="orderbar">
                      <span className="plus" onClick={handlePlus}>
                        +
                      </span>
                      <span className="count">{}</span>
                      <span className="minus" onClick={handleMinus}>
                        -
                      </span>
                      <p>Order</p>
                      {}
                    </div>
                  </div>
                </div>

*/
