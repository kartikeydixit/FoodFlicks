import React, { useState, useEffect } from "react";
import "./Login.css";
import Header from "./../Header/Header";
import { connect } from "react-redux";
import { fetchLogin } from "../../Redux/userAction";
import { useNavigate } from "react-router-dom";
const Login = ({ userState, fetchLogin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { name, email, password } = data;
  const { loading, error, isAuthenticated, user } = userState;
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin(data);
    setData({
      ...data,
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (isAuthenticated) {
      if (localStorage.getItem("token") == undefined) {
        localStorage.setItem("token", user.token);
      }
      navigate("/");
    }
  }, [mapDispatchToProps, error, isAuthenticated]);

  return (
    <div className="mainD">
      <Header />
      <div className="formData">
        <h3>Login Form</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            placeholder="Enter your Email"
            name="email"
            onChange={handleChange}
          />
          <input
            value={password}
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userState: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchLogin: (user) => dispatch(fetchLogin(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
