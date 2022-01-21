import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import foodImg from "./../../asset/Food.jpg";
import { connect } from "react-redux";
import "./CanteenSec.css";
import { fetchCanteens } from "../../Redux/canteenAction";

const CanteenSec = ({ canteensState, fetchCanteens }) => {
  useEffect(() => {
    fetchCanteens();
  }, []);

  const { loading, error } = canteensState;
  const { canteens } = canteensState.canteens;

  return (
    <Fragment>
      {!canteens ? (
        <h2>Loading........</h2>
      ) : (
        <div>
          <Header />
          <div className="CanteenSecMain">
            {canteens.map((each) => (
              <div className="CanteenSecCard" key={each._id}>
                <Link to={`/canteen/${each._id}`}>
                  <img src={foodImg} />
                  <h3>{each.name}</h3>
                  <p>{each.location}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    canteensState: state.allCanteens,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCanteens: () => dispatch(fetchCanteens()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CanteenSec);
