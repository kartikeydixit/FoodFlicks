import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
import store from "../../Redux/store";
import { logoutUser } from "../../Redux/userAction";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const handleLogout = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      store.dispatch(logoutUser());
      navigate("/");
    }
  };
  return (
    <div className="headerMain">
      <div>
        <Link to="/">FoodFlicks</Link>
      </div>
      <div>
        <Link to="/">Home</Link>
      </div>
      {isAuthenticated == true ? (
        <Fragment>
          <div>
            <Link to={`/user/${user.user._id}`}>{user.user.name}</Link>
          </div>
          <div>
            <span className="logoutBtn" onClick={handleLogout}>
              Logout
            </span>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/signup">Signup</Link>
          </div>
        </Fragment>
      )}

      <div>
        <Link to="/canteens">Canteens</Link>
      </div>
    </div>
  );
};

export default Header;
