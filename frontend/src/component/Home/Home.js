import React, { useEffect } from "react";
import "./Home.css";
import cookie from "./../../asset/cookie.svg";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import CanteenSec from "../CanteenSec/CanteenSec";
import store from "./../../Redux/store";
import { loadUser } from "../../Redux/userAction";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div>
      <Header />
      <div className="homeMain">
        <div className="homeContent">
          <span className="contentSpan">
            <h2>Welcome to FoodFlicks!</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              omnis obcaecati alias consequuntur dolore aut, quasi perferendis
              consectetur temporibus reprehenderit. Perferendis hic ipsum
              mollitia labore possimus atque ad dignissimos.
            </p>
          </span>
          <br />
          <br />

          {isAuthenticated == false ? (
            <span className="btnSpan">
              <span className="btn">
                <Link to="/login">Login</Link>
              </span>
              <span className="btn">
                <Link to="/signup">Signup</Link>
              </span>
            </span>
          ) : (
            <span>
              {user.user.role > 0 ? (
                <span className="admin">
                  <b>Hey admin</b>
                  <span className="btn">add canteen</span>
                </span>
              ) : (
                <p></p>
              )}
            </span>
          )}
        </div>

        <div className="homeImg">
          <img src={cookie} />
        </div>
      </div>
    </div>
  );
};

export default Home;
